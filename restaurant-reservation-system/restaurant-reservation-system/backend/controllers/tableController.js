const asyncHandler = require("express-async-handler");
const Table = require("../models/Table");
const Reservation = require("../models/Reservation");
const Restaurant = require("../models/Restaurant");

// @desc    Get active tables for a restaurant, plus valid time slots
// @route   GET /api/tables?restaurant=<restaurantId>
// @access  Private
const getTables = asyncHandler(async (req, res) => {
  const { restaurant } = req.query;
  if (!restaurant) {
    res.status(400);
    throw new Error("restaurant query parameter is required");
  }

  const tables = await Table.find({ restaurant, isActive: true }).sort({ label: 1 });
  res.json({
    success: true,
    data: tables,
    timeSlots: Reservation.TIME_SLOTS,
  });
});

// @desc    Create a new table for a restaurant
// @route   POST /api/tables
// @access  Private/Admin
const createTable = asyncHandler(async (req, res) => {
  const { restaurant, label, capacity } = req.body;

  if (!restaurant || !label || !capacity) {
    res.status(400);
    throw new Error("restaurant, label and capacity are required");
  }

  const restaurantDoc = await Restaurant.findById(restaurant);
  if (!restaurantDoc) {
    res.status(404);
    throw new Error("Restaurant not found");
  }

  const table = await Table.create({ restaurant, label, capacity });
  res.status(201).json({ success: true, data: table });
});

// @desc    Update a table (capacity, label, active status)
// @route   PUT /api/tables/:id
// @access  Private/Admin
const updateTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (!table) {
    res.status(404);
    throw new Error("Table not found");
  }

  const { label, capacity, isActive, restaurant } = req.body;
  if (label !== undefined) table.label = label;
  if (capacity !== undefined) table.capacity = capacity;
  if (isActive !== undefined) table.isActive = isActive;
  if (restaurant !== undefined) table.restaurant = restaurant;

  const updated = await table.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete (deactivate) a table
// @route   DELETE /api/tables/:id
// @access  Private/Admin
const deleteTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (!table) {
    res.status(404);
    throw new Error("Table not found");
  }

  // Soft delete to preserve historical reservation references
  table.isActive = false;
  await table.save();

  res.json({ success: true, message: "Table deactivated" });
});

module.exports = { getTables, createTable, updateTable, deleteTable };
