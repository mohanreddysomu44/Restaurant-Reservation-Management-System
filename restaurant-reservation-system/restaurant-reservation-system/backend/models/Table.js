const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Table must belong to a restaurant"],
    },
    label: {
      type: String,
      required: [true, "Table label is required"],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, "Table capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Table labels only need to be unique within a single restaurant
// (e.g. two different restaurants can each have a "T1").
tableSchema.index({ restaurant: 1, label: 1 }, { unique: true });

module.exports = mongoose.model("Table", tableSchema);
