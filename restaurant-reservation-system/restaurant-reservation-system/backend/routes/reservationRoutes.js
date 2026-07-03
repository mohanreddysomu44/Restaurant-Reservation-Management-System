const express = require("express");
const {
  createReservation,
  getMyReservations,
  cancelMyReservation,
  getAllReservations,
  updateReservation,
  adminCancelReservation,
} = require("../controllers/reservationController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Customer routes
router.post("/", protect, authorize("customer"), createReservation);
router.get("/my", protect, authorize("customer"), getMyReservations);
router.patch("/:id/cancel", protect, authorize("customer"), cancelMyReservation);

// Admin routes
router.get("/", protect, authorize("admin"), getAllReservations);
router.put("/:id", protect, authorize("admin"), updateReservation);
router.patch("/:id/admin-cancel", protect, authorize("admin"), adminCancelReservation);

module.exports = router;
