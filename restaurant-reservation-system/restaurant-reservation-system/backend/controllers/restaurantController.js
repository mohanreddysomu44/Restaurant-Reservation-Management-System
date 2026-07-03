const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/Restaurant");
const Table = require("../models/Table");

// @desc    List active restaurants (browsable, no login required)
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({ isActive: true }).sort({ name: 1 });
  res.json({ success: true, data: restaurants });
});

// @desc    Get a single restaurant's public detail
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant || !restaurant.isActive) {
    res.status(404);
    throw new Error("Restaurant not found");
  }
  res.json({ success: true, data: restaurant });
});

// @desc    Create a restaurant
// @route   POST /api/restaurants
// @access  Private/Admin
const createRestaurant = asyncHandler(async (req, res) => {
  const { name, tagline, cuisine, city, description, heroImage } = req.body;

  if (!name || !cuisine || !heroImage) {
    res.status(400);
    throw new Error("name, cuisine and heroImage are required");
  }

  const restaurant = await Restaurant.create({
    name,
    tagline,
    cuisine,
    city,
    description,
    heroImage,
  });

  res.status(201).json({ success: true, data: restaurant });
});

// @desc    Update a restaurant
// @route   PUT /api/restaurants/:id
// @access  Private/Admin
const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    res.status(404);
    throw new Error("Restaurant not found");
  }

  const { name, tagline, cuisine, city, description, heroImage, isActive } = req.body;
  if (name !== undefined) restaurant.name = name;
  if (tagline !== undefined) restaurant.tagline = tagline;
  if (cuisine !== undefined) restaurant.cuisine = cuisine;
  if (city !== undefined) restaurant.city = city;
  if (description !== undefined) restaurant.description = description;
  if (heroImage !== undefined) restaurant.heroImage = heroImage;
  if (isActive !== undefined) restaurant.isActive = isActive;

  const updated = await restaurant.save();
  res.json({ success: true, data: updated });
});

// @desc    Deactivate a restaurant (soft delete; also deactivates its tables)
// @route   DELETE /api/restaurants/:id
// @access  Private/Admin
const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    res.status(404);
    throw new Error("Restaurant not found");
  }

  restaurant.isActive = false;
  await restaurant.save();
  await Table.updateMany({ restaurant: restaurant._id }, { isActive: false });

  res.json({ success: true, message: "Restaurant deactivated" });
});

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
