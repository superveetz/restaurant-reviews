import express from "express";

// src
import userRoutes from "./user.mjs";
import restaurantRoutes from "./restaurant.mjs";
import reviewRoutes from "./review.mjs";

const router = express.Router();

router.use("/api", userRoutes);
router.use("/api", restaurantRoutes);
router.use("/api", reviewRoutes);

export default router;
