import express from "express";
import { reserveTable, searchRestaurants } from "../controllers/restaurant.controller";

const router = express.Router();

router.post("/search", searchRestaurants);

router.post("/reserve", reserveTable);

export default router;
