const express = require("express");
const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Public — anyone can browse restaurants without logging in
router.get("/", getRestaurants);
router.get("/:id", getRestaurant);

// Admin only
router.post("/", protect, authorize("admin"), createRestaurant);
router.put("/:id", protect, authorize("admin"), updateRestaurant);
router.delete("/:id", protect, authorize("admin"), deleteRestaurant);

module.exports = router;
