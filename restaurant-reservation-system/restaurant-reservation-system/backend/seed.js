// Seeds an admin user, four partner restaurants, and a set of tables for
// each restaurant. Run with: npm run seed
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
const Table = require("./models/Table");
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const ADMIN_EMAIL = "admin@restaurant.com";
const ADMIN_PASSWORD = "Admin@123";

// Table layouts are the same shape for every restaurant; feel free to
// customize per restaurant later from the admin dashboard.
const TABLE_LAYOUT = [
  { label: "T1", capacity: 2 },
  { label: "T2", capacity: 2 },
  { label: "T3", capacity: 4 },
  { label: "T4", capacity: 4 },
  { label: "T5", capacity: 6 },
  { label: "T6", capacity: 8 },
];

// Verified, hotlink-safe Unsplash photos (Unsplash License — free to use).
const RESTAURANTS = [
  {
    name: "Hearth & Table",
    tagline: "Wood-fired, slow-cooked, always warm",
    cuisine: "Modern American",
    city: "Downtown",
    description:
      "An open-hearth kitchen turning out slow-roasted mains and seasonal plates, in a dining room built for long, unhurried dinners.",
    heroImage:
      "https://images.unsplash.com/photo-1653259038915-7cf0b7a4dd6c?auto=format&fit=crop&w=1600&q=75",
  },
  {
    name: "Amber & Vine",
    tagline: "Small plates, shared tables, good light",
    cuisine: "Mediterranean",
    city: "Old Town",
    description:
      "Mezze, wood-grilled vegetables, and a wine list built for sharing — under a canopy of hanging vines in the conservatory dining room.",
    heroImage:
      "https://images.unsplash.com/photo-1526069631228-723c945bea6b?auto=format&fit=crop&w=1600&q=75",
  },
  {
    name: "Copper & Char",
    tagline: "A modern chophouse, plated with intent",
    cuisine: "Contemporary Grill",
    city: "Riverside",
    description:
      "Char-grilled mains and precise plating in a room designed around the kitchen pass — every dish finished tableside.",
    heroImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=75",
  },
  {
    name: "Salt & Ember",
    tagline: "Coastal cooking, candlelit tables",
    cuisine: "Coastal Fine Dining",
    city: "Harbor District",
    description:
      "A tight, seasonal menu built around the day's catch, served at candlelit tables set for slow evenings.",
    heroImage:
      "https://images.unsplash.com/photo-1643101570532-88c8ecc07c1f?auto=format&fit=crop&w=1600&q=75",
  },
];

const run = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
  if (!existingAdmin) {
    await User.create({
      name: "Restaurant Admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
    });
    console.log(
      `Admin created -> email: ${ADMIN_EMAIL} / password: ${ADMIN_PASSWORD}`,
    );
  } else {
    console.log("Admin user already exists, skipping.");
  }

  for (const r of RESTAURANTS) {
    let restaurant = await Restaurant.findOne({ name: r.name });
    if (!restaurant) {
      restaurant = await Restaurant.create(r);
      console.log(`Restaurant "${r.name}" created.`);
    } else {
      console.log(`Restaurant "${r.name}" already exists, skipping.`);
    }

    for (const t of TABLE_LAYOUT) {
      const existingTable = await Table.findOne({ restaurant: restaurant._id, label: t.label });
      if (!existingTable) {
        await Table.create({ ...t, restaurant: restaurant._id });
        console.log(`  Table ${t.label} (capacity ${t.capacity}) created for ${r.name}.`);
      }
    }
  }

  console.log("Seeding complete.");
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
