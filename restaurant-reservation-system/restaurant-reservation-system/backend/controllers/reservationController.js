const asyncHandler = require("express-async-handler");
const Reservation = require("../models/Reservation");
const Table = require("../models/Table");
const Restaurant = require("../models/Restaurant");

const isValidDateString = (dateStr) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !Number.isNaN(date.getTime());
};

const isPastDate = (dateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  return date.getTime() < today.getTime();
};

// Finds a table (within one restaurant) that can seat the given number of
// guests and is free for the given date/slot. Returns the smallest such
// table (to use capacity efficiently) or null if none is available.
const findAvailableTable = async ({ restaurantId, date, timeSlot, guests, preferredTableId }) => {
  const candidateQuery = {
    restaurant: restaurantId,
    isActive: true,
    capacity: { $gte: guests },
  };
  if (preferredTableId) candidateQuery._id = preferredTableId;

  const candidateTables = await Table.find(candidateQuery).sort({ capacity: 1 });
  if (candidateTables.length === 0) return null;

  const bookedTableIds = new Set(
    (
      await Reservation.find({
        date,
        timeSlot,
        status: "confirmed",
        table: { $in: candidateTables.map((t) => t._id) },
      }).select("table")
    ).map((r) => r.table.toString())
  );

  return candidateTables.find((t) => !bookedTableIds.has(t._id.toString())) || null;
};

const populateReservation = (query) =>
  query.populate({
    path: "table",
    select: "label capacity restaurant",
    populate: { path: "restaurant", select: "name heroImage city" },
  });

// @desc    Create a reservation for a given restaurant. Table is
//          auto-assigned unless tableId is provided.
// @route   POST /api/reservations
// @access  Private/Customer
const createReservation = asyncHandler(async (req, res) => {
  const { restaurantId, date, timeSlot, guests, tableId } = req.body;

  if (!restaurantId || !date || !timeSlot || !guests) {
    res.status(400);
    throw new Error("restaurantId, date, timeSlot and guests are required");
  }

  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant || !restaurant.isActive) {
    res.status(404);
    throw new Error("Restaurant not found");
  }

  if (!isValidDateString(date)) {
    res.status(400);
    throw new Error("date must be a valid date in YYYY-MM-DD format");
  }

  if (isPastDate(date)) {
    res.status(400);
    throw new Error("Cannot create a reservation for a past date");
  }

  if (!Reservation.TIME_SLOTS.includes(timeSlot)) {
    res.status(400);
    throw new Error(`timeSlot must be one of: ${Reservation.TIME_SLOTS.join(", ")}`);
  }

  const guestCount = Number(guests);
  if (!Number.isInteger(guestCount) || guestCount < 1) {
    res.status(400);
    throw new Error("guests must be a positive integer");
  }

  if (tableId) {
    // Customer requested a specific table — validate it belongs to this
    // restaurant and can actually hold them
    const requestedTable = await Table.findById(tableId);
    if (
      !requestedTable ||
      !requestedTable.isActive ||
      requestedTable.restaurant.toString() !== restaurantId
    ) {
      res.status(404);
      throw new Error("Requested table not found at this restaurant");
    }
    if (requestedTable.capacity < guestCount) {
      res.status(422);
      throw new Error(
        `Table ${requestedTable.label} only seats ${requestedTable.capacity} guests`
      );
    }
  }

  const table = await findAvailableTable({
    restaurantId,
    date,
    timeSlot,
    guests: guestCount,
    preferredTableId: tableId,
  });

  if (!table) {
    res.status(409);
    throw new Error(
      "No table is available for the selected date, time slot and party size"
    );
  }

  try {
    const reservation = await Reservation.create({
      customer: req.user._id,
      table: table._id,
      date,
      timeSlot,
      guests: guestCount,
    });

    const populated = await populateReservation(Reservation.findById(reservation._id));
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    // Race condition safety net: the unique partial index on
    // (table, date, timeSlot, status=confirmed) rejects a concurrent
    // double-booking that slipped past the application-level check above.
    if (err.code === 11000) {
      res.status(409);
      throw new Error("This table was just booked for that slot. Please try again.");
    }
    throw err;
  }
});

// @desc    Get logged-in customer's own reservations (across all restaurants)
// @route   GET /api/reservations/my
// @access  Private/Customer
const getMyReservations = asyncHandler(async (req, res) => {
  const reservations = await populateReservation(
    Reservation.find({ customer: req.user._id }).sort({ date: -1, createdAt: -1 })
  );

  res.json({ success: true, data: reservations });
});

// @desc    Cancel own reservation
// @route   PATCH /api/reservations/:id/cancel
// @access  Private/Customer
const cancelMyReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }

  if (reservation.customer.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You can only cancel your own reservations");
  }

  if (reservation.status === "cancelled") {
    res.status(400);
    throw new Error("Reservation is already cancelled");
  }

  reservation.status = "cancelled";
  await reservation.save();

  res.json({ success: true, data: reservation });
});

// @desc    Get all reservations (optionally filtered by date/status/restaurant)
// @route   GET /api/reservations
// @access  Private/Admin
const getAllReservations = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.date) {
    if (!isValidDateString(req.query.date)) {
      res.status(400);
      throw new Error("date query param must be in YYYY-MM-DD format");
    }
    filter.date = req.query.date;
  }
  if (req.query.status) filter.status = req.query.status;

  let reservations = await populateReservation(
    Reservation.find(filter)
      .populate("customer", "name email")
      .sort({ date: -1, timeSlot: 1 })
  );

  // Restaurant filter applied post-populate since it lives on the
  // nested table document
  if (req.query.restaurant) {
    reservations = reservations.filter(
      (r) => r.table?.restaurant?._id?.toString() === req.query.restaurant
    );
  }

  res.json({ success: true, data: reservations });
});

// @desc    Admin: update any reservation (date, timeSlot, guests, table, status)
// @route   PUT /api/reservations/:id
// @access  Private/Admin
const updateReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }

  const { date, timeSlot, guests, tableId, status } = req.body;

  const nextDate = date ?? reservation.date;
  const nextSlot = timeSlot ?? reservation.timeSlot;
  const nextGuests = guests !== undefined ? Number(guests) : reservation.guests;
  const nextTableId = tableId ?? reservation.table.toString();

  if (date && !isValidDateString(date)) {
    res.status(400);
    throw new Error("date must be a valid date in YYYY-MM-DD format");
  }
  if (timeSlot && !Reservation.TIME_SLOTS.includes(timeSlot)) {
    res.status(400);
    throw new Error(`timeSlot must be one of: ${Reservation.TIME_SLOTS.join(", ")}`);
  }

  // If any conflict-relevant field changed, re-validate availability
  const relevantFieldsChanged =
    nextDate !== reservation.date ||
    nextSlot !== reservation.timeSlot ||
    nextTableId !== reservation.table.toString();

  if (relevantFieldsChanged) {
    const table = await Table.findById(nextTableId);
    if (!table || !table.isActive) {
      res.status(404);
      throw new Error("Table not found or inactive");
    }
    if (table.capacity < nextGuests) {
      res.status(422);
      throw new Error(`Table ${table.label} only seats ${table.capacity} guests`);
    }

    const conflict = await Reservation.findOne({
      _id: { $ne: reservation._id },
      table: nextTableId,
      date: nextDate,
      timeSlot: nextSlot,
      status: "confirmed",
    });

    if (conflict) {
      res.status(409);
      throw new Error("Another reservation already holds that table/date/slot");
    }
  }

  reservation.date = nextDate;
  reservation.timeSlot = nextSlot;
  reservation.guests = nextGuests;
  reservation.table = nextTableId;
  if (status) reservation.status = status;

  const updated = await reservation.save();
  const populated = await populateReservation(Reservation.findById(updated._id));
  res.json({ success: true, data: populated });
});

// @desc    Admin: cancel any reservation
// @route   PATCH /api/reservations/:id/admin-cancel
// @access  Private/Admin
const adminCancelReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }

  reservation.status = "cancelled";
  await reservation.save();

  res.json({ success: true, data: reservation });
});

module.exports = {
  createReservation,
  getMyReservations,
  cancelMyReservation,
  getAllReservations,
  updateReservation,
  adminCancelReservation,
};
