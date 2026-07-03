const mongoose = require("mongoose");

// Fixed set of bookable time slots. Using discrete slots (instead of free-form
// start/end times) keeps overlap detection simple and unambiguous: two
// reservations conflict if and only if they share the same table, the same
// date, and the same slot.
const TIME_SLOTS = [
  "12:00-13:30",
  "13:30-15:00",
  "18:00-19:30",
  "19:30-21:00",
  "21:00-22:30",
];

const reservationSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    date: {
      // Stored as YYYY-MM-DD string for simple, unambiguous comparisons
      type: String,
      required: [true, "Reservation date is required"],
      match: [/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"],
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
      enum: TIME_SLOTS,
    },
    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "There must be at least 1 guest"],
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

// Prevent the same table from being double-booked for the same date/slot
// among active (confirmed) reservations at the database level as a safety net,
// in addition to the application-level check performed in the controller.
reservationSchema.index(
  { table: 1, date: 1, timeSlot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "confirmed" },
  }
);

reservationSchema.statics.TIME_SLOTS = TIME_SLOTS;

module.exports = mongoose.model("Reservation", reservationSchema);
