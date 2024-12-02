import "reflect-metadata";
import { DataSource } from "typeorm";
import { Diner } from "./entities/Diner";
import { Restaurant } from "./entities/Restaurant";
import { Table } from "./entities/Table";
import { Reservation } from "./entities/Reservation";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "social_restaurant",
  synchronize: true,
  logging: true,
  entities: [Diner, Restaurant, Table, Reservation],
});