import express from "express";
import restaurantRoutes from "./routes/restaurant.routes";
import { AppDataSource } from "./data-source";

const app = express();

app.use(express.json());

app.use("/restaurants", restaurantRoutes);

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err));

export default app;
