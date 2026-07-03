import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const todayStr = () => new Date().toISOString().split("T")[0];
const shortCode = (id) => `RES-${id.slice(-4).toUpperCase()}`;

export default function RestaurantDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [tables, setTables] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [form, setForm] = useState({ date: todayStr(), timeSlot: "", guests: 2, tableId: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/restaurants/${id}`)
      .then((res) => setRestaurant(res.data.data))
      .catch(() => setLoadError("This restaurant couldn't be found."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!user || user.role !== "customer") return;
    api
      .get("/tables", { params: { restaurant: id } })
      .then((res) => {
        setTables(res.data.data);
        setTimeSlots(res.data.timeSlots);
        setForm((f) => ({ ...f, timeSlot: f.timeSlot || res.data.timeSlots[0] || "" }));
      })
      .catch(() => setError("Could not load tables for this restaurant."));
  }, [id, user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const payload = {
        restaurantId: id,
        date: form.date,
        timeSlot: form.timeSlot,
        guests: Number(form.guests),
      };
      if (form.tableId) payload.tableId = form.tableId;

      const res = await api.post("/reservations", payload);
      setSuccess(
        `Reservation ${shortCode(res.data.data._id)} confirmed — table ${res.data.data.table.label} on ${res.data.data.date} at ${res.data.data.timeSlot}.`
      );
      setForm((f) => ({ ...f, tableId: "" }));
    } catch (err) {
      setError(err.response?.data?.message || "Could not create reservation");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="page-loading">Loading restaurant…</p>;
  if (loadError || !restaurant) {
    return (
      <div className="page">
        <div className="alert alert-error">{loadError || "Restaurant not found."}</div>
        <Link to="/" className="back-link">
          ← Back to all restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Back to all restaurants
      </Link>

      <div className="restaurant-hero">
        <img src={restaurant.heroImage} alt={restaurant.name} />
        <div className="restaurant-hero-content">
          <div className="restaurant-hero-cuisine">
            {restaurant.cuisine} {restaurant.city ? `· ${restaurant.city}` : ""}
          </div>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.tagline}</p>
        </div>
      </div>

      <div className="restaurant-detail-grid">
        <div>
          {restaurant.description && (
            <section className="card">
              <h2>About</h2>
              <div className="perf-divider">
                <span className="perf-dot" />
              </div>
              <p>{restaurant.description}</p>
              <div className="restaurant-badge-row">
                <span className="pill">{restaurant.cuisine}</span>
                {restaurant.city && <span className="pill">{restaurant.city}</span>}
              </div>
            </section>
          )}
        </div>

        <div>
          {!user && (
            <section className="card login-prompt">
              <h2>Reserve a table</h2>
              <p>Log in or create an account to book at {restaurant.name}.</p>
              <div className="hero-actions" style={{ justifyContent: "center" }}>
                <Link to="/register" className="btn btn-primary">
                  Create account
                </Link>
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
              </div>
            </section>
          )}

          {user && user.role === "admin" && (
            <section className="card login-prompt">
              <h2>Admin account</h2>
              <p>
                Admins manage bookings from the dashboard rather than booking directly.
              </p>
              <Link to="/admin" className="btn btn-primary">
                Go to admin dashboard
              </Link>
            </section>
          )}

          {user && user.role === "customer" && (
            <section className="card">
              <h2>Reserve a table</h2>
              <div className="perf-divider">
                <span className="perf-dot" />
              </div>
              <form onSubmit={handleSubmit} className="reservation-form">
                <label>
                  Date
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    min={todayStr()}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Time slot
                  <select name="timeSlot" value={form.timeSlot} onChange={handleChange} required>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Guests
                  <input
                    type="number"
                    name="guests"
                    min="1"
                    value={form.guests}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Preferred table (optional)
                  <select name="tableId" value={form.tableId} onChange={handleChange}>
                    <option value="">Auto-assign</option>
                    {tables.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.label} (seats {t.capacity})
                      </option>
                    ))}
                  </select>
                </label>

                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? "Booking…" : "Reserve table"}
                </button>
              </form>

              {error && <div className="alert alert-error">{error}</div>}
              {success && (
                <div className="alert alert-success">
                  {success} <Link to="/customer">View my reservations →</Link>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
