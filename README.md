# Restaurant Reservation Management System — "Reserved."

A full-stack MERN application for browsing and booking tables across several
partner restaurants, with separate customer and administrator experiences.

- **Frontend:** React (Vite) + React Router + Axios
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (stateless, role-based)

```
restaurant-reservation-system/
├── backend/     Express API, MongoDB models, auth, business logic
└── frontend/    React SPA (public browse + customer + admin views)
```

## Multi-restaurant architecture

The app is a small marketplace ("Reserved.") hosting four partner
restaurants, each with its own name, photo, cuisine, and set of tables:

- **Hearth & Table** — Modern American
- **Amber & Vine** — Mediterranean
- **Copper & Char** — Contemporary Grill
- **Salt & Ember** — Coastal Fine Dining

Anyone (logged in or not) can browse restaurants on the homepage and click
into a restaurant's page to see its details. Booking a table requires a
customer account. `Table` documents now belong to a `Restaurant`
(`restaurant` field), and availability/conflict checks are scoped per
restaurant + table + date + time slot, exactly as before.

> **If you're upgrading an existing database:** the old `Table` schema had a
> single globally-unique `label` field. The new schema uniquely indexes
> `(restaurant, label)` instead. Drop your existing `tables` collection (or
> the whole database) in Atlas before running `npm run seed` again, otherwise
> the old unique index on `label` will cause duplicate-key errors when
> multiple restaurants each get a "T1".

---

## 1. Setup Instructions

### Prerequisites
- Node.js 18+
- A MongoDB connection string (local MongoDB, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI to your MongoDB connection string,
# and set JWT_SECRET to any long random string
npm run seed     # creates 1 admin user + 6 sample tables
npm run dev       # starts the API on http://localhost:5000
```

Seeded admin login (created by `npm run seed`):
```
email:    admin@restaurant.com
password: Admin@123
```

Any account created via the public "Register" page is created as a **customer** —
there is no public path to create an admin account, by design.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# edit .env if your backend isn't on http://localhost:5000
npm run dev       # starts the app on http://localhost:5173
```

Open `http://localhost:5173`, register as a customer (or log in as the seeded
admin above) and start booking.

### Running both together
Two terminals: one running `npm run dev` in `backend/`, one running
`npm run dev` in `frontend/`. The frontend's `VITE_API_BASE_URL` must point at
the backend's `/api` root.

---

## 2. Assumptions Made

- **Single restaurant, fixed tables.** Tables are seeded/managed by the admin;
  there's no multi-restaurant/multi-location concept.
- **Discrete time slots rather than free-form times.** The system uses a fixed
  list of bookable slots (`12:00-13:30`, `13:30-15:00`, `18:00-19:30`,
  `19:30-21:00`, `21:00-22:30`) instead of arbitrary start/end times. This
  removes ambiguity around what counts as "overlapping" and keeps conflict
  detection a simple equality check. It's a deliberate simplification — see
  Limitations below.
- **One reservation = one table.** No party-splitting across multiple tables
  or combining tables for large groups.
- **Public registration always creates a "customer" account.** Admin accounts
  are provisioned via the seed script (in a real system this would be an
  internal-only flow).
- **Cancellation only, no rescheduling by customers.** Customers can cancel
  their own reservations; changing date/time/table on an existing reservation
  is an admin-only action (`PUT /api/reservations/:id`).
- **Soft-deleted tables.** Deactivating a table doesn't delete it, so historical
  reservations referencing it stay intact.

---

## 3. Reservation & Availability Logic

This is the core of the system, implemented in
`backend/controllers/reservationController.js`.

**A reservation is defined by:** `table + date + timeSlot`, plus `guests` and
`status` (`confirmed` / `cancelled`).

**When a customer requests a booking** (`POST /api/reservations` with `date`,
`timeSlot`, `guests`, and optionally a specific `tableId`):

1. **Input validation** — date must be a real, non-past date in `YYYY-MM-DD`
   format; `timeSlot` must be one of the fixed slots; `guests` must be a
   positive integer.
2. **Capacity check** — if a specific table was requested, it must be active
   and have `capacity >= guests`. Otherwise, the system searches all active
   tables with sufficient capacity.
3. **Conflict check** — among capacity-eligible tables, the system looks for
   any table that does **not** already have a `confirmed` reservation for that
   exact `date + timeSlot`, and assigns the smallest such table (to use
   capacity efficiently, e.g. a party of 2 won't take the 8-seat table if a
   2-seat table is free).
4. **No table available** → the API returns `409 Conflict` with a clear
   message, instead of a generic error.
5. **Race condition safety net** — two people booking the last available
   table for the same slot at the same instant is handled by a **MongoDB
   partial unique index** on `(table, date, timeSlot)` scoped to
   `status: "confirmed"`. Even if the application-level check above is
   passed by two concurrent requests, the database itself rejects the second
   `insert`, and the controller catches that as a `409` too.
6. **Cancelling a reservation** sets `status: "cancelled"` (not a hard delete)
   — it immediately frees up that table/date/slot for others, since the
   uniqueness constraint and conflict search both only consider `confirmed`
   reservations.

**Admin updates** (`PUT /api/reservations/:id`) re-run the same capacity and
conflict checks whenever the table, date, or slot is changed, so an admin
can't accidentally create a double-booking either.

---

## 4. Role-Based Access (Customer vs Admin)

- **Authentication:** `POST /api/auth/login` returns a JWT containing the
  user's ID. The frontend stores it in `localStorage` and attaches it as
  `Authorization: Bearer <token>` on every request (`frontend/src/api/axios.js`).
- **Authorization:** the backend has two middleware layers
  (`backend/middleware/auth.js`):
  - `protect` — verifies the JWT and loads the user onto `req.user`.
  - `authorize(...roles)` — checks `req.user.role` against an allow-list,
    returning `403 Forbidden` otherwise.
- **Route-level enforcement (backend, source of truth):**
  | Route | Access |
  |---|---|
  | `POST /api/reservations`, `GET /api/reservations/my`, `PATCH /api/reservations/:id/cancel` | customer only |
  | `GET /api/reservations`, `PUT /api/reservations/:id`, `PATCH /api/reservations/:id/admin-cancel` | admin only |
  | `POST/PUT/DELETE /api/tables` | admin only |
  | `GET /api/tables` | any authenticated user |
- **Frontend enforcement (UX convenience, not a security boundary):**
  `ProtectedRoute` redirects unauthenticated users to `/login` and redirects
  users to their own dashboard if they try to visit the other role's route.
  The admin view (`/admin`) is visually distinct (dark navbar, "ADMIN" badge)
  from the customer view (`/customer`).
  All real enforcement happens on the backend — the frontend checks exist only
  to avoid dead-end UI states.

---

## 5. API Summary

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register as a customer |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Private | Current user profile |
| GET | `/api/restaurants` | Public | List active restaurants |
| GET | `/api/restaurants/:id` | Public | Get one restaurant's detail |
| POST | `/api/restaurants` | Admin | Create a restaurant |
| PUT | `/api/restaurants/:id` | Admin | Update a restaurant |
| DELETE | `/api/restaurants/:id` | Admin | Deactivate a restaurant (and its tables) |
| GET | `/api/tables?restaurant=<id>` | Private | List a restaurant's active tables + valid time slots |
| POST | `/api/tables` | Admin | Create a table (requires `restaurant`) |
| PUT | `/api/tables/:id` | Admin | Update a table |
| DELETE | `/api/tables/:id` | Admin | Deactivate a table |
| POST | `/api/reservations` | Customer | Create a reservation (requires `restaurantId`) |
| GET | `/api/reservations/my` | Customer | List own reservations, across all restaurants |
| PATCH | `/api/reservations/:id/cancel` | Customer | Cancel own reservation |
| GET | `/api/reservations?date=YYYY-MM-DD&restaurant=<id>` | Admin | List reservations, optional date/restaurant filter |
| PUT | `/api/reservations/:id` | Admin | Update any reservation |
| PATCH | `/api/reservations/:id/admin-cancel` | Admin | Cancel any reservation |

All error responses share the shape `{ success: false, message: "..." }` with
an appropriate HTTP status code (400/401/403/404/409/422), produced by the
centralized error handler in `backend/middleware/errorHandler.js`.

---

## 6. Deployment

This must be deployed to a public URL per the assignment. Suggested (all have
free tiers):

**Backend → Render / Railway:**
1. Push this repo to GitHub.
2. Create a new Web Service, root directory `backend`, build command
   `npm install`, start command `npm start`.
3. Set environment variables `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`,
   `CLIENT_ORIGIN` (your deployed frontend URL) in the platform's dashboard.
4. After first deploy, run the seed script once (Render/Railway shell, or a
   temporary local run against the production `MONGO_URI`) to create the
   admin user and tables.

**Database → MongoDB Atlas:** create a free M0 cluster, add a database user,
allow network access from anywhere (`0.0.0.0/0`) for simplicity, and use the
provided connection string as `MONGO_URI`.

**Frontend → Vercel / Netlify:**
1. Root directory `frontend`, build command `npm run build`, output directory
   `dist`.
2. Set `VITE_API_BASE_URL` to your deployed backend's `/api` URL
   (e.g. `https://your-api.onrender.com/api`).

Once both are live, update the backend's `CLIENT_ORIGIN` env var to the
frontend's real URL so CORS allows it.

---

## 7. Known Limitations

- Fixed time slots rather than arbitrary reservation lengths — a party can't
  book, say, a 2-hour custom window.
- No table combining for oversized parties (a party of 10 with no single
  table that large simply can't book, even if two smaller tables could
  together seat them).
- No email/SMS confirmation or reminder notifications (explicitly out of
  scope per the assignment).
- No pagination on the admin's "all reservations" list — fine at seed-data
  scale, would need it for a real production dataset.
- No password reset / email verification flow.
- Frontend role checks are UX-only; a technically savvy user could hit backend
  routes directly, but the backend authorization layer rejects anything
  outside their role regardless.

## 8. Areas for Improvement (with more time)

- Configurable, admin-managed time slots instead of a hardcoded list.
- Multi-table booking/combination logic for large parties.
- Pagination and search/sort on the admin reservations table.
- Email confirmations and reminders.
- Automated test suite (Jest/Supertest for the API, React Testing Library for
  the frontend) — the availability logic in particular deserves dedicated
  conflict/race-condition tests.
- Waitlist functionality for fully booked slots.
- Basic analytics for admins (occupancy by day/slot, no-show tracking).
