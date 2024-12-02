import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { Restaurant } from "../entities/Restaurant";
import { Table } from "../entities/Table";
import { Diner } from "../entities/Diner";
import * as XLSX from "xlsx";

// Definir interfaces para las hojas del Excel
interface RestaurantRow {
  Name: string;
  Endorsements?: string;
  "No. of two-top tables"?: number;
  "No. of four-top tables"?: number;
  "No. of six-top tables"?: number;
}

interface DinerRow {
  Name: string;
  "Dietary Restrictions"?: string;
  "Home Location"?: string;
}

async function seedDatabase() {
  try {
    // Inicializar conexión con la base de datos
    await AppDataSource.initialize();

    console.log("Conexión establecida con la base de datos.");

    // Leer el archivo Excel
    const workbook = XLSX.readFile("src/seed/Social Restaurant Booking Sample Data.xlsx");
    const restaurantsSheet: RestaurantRow[] = XLSX.utils.sheet_to_json<RestaurantRow>(workbook.Sheets["Restaurants"]);
    const dinersSheet: DinerRow[] = XLSX.utils.sheet_to_json<DinerRow>(workbook.Sheets["Diners"]);

    // Insertar Restaurantes y Mesas
    for (const row of restaurantsSheet) {
      const restaurant = new Restaurant();
      restaurant.name = row.Name;
      restaurant.endorsements = row.Endorsements?.split(", ").filter((e) => e) || [];
      await AppDataSource.manager.save(restaurant);

      // Crear Mesas asociadas al Restaurante
      const tableSizes = [
        { size: 2, count: row["No. of two-top tables"] || 0 },
        { size: 4, count: row["No. of four-top tables"] || 0 },
        { size: 6, count: row["No. of six-top tables"] || 0 },
      ];

      for (const { size, count } of tableSizes) {
        for (let i = 0; i < count; i++) {
          const table = new Table();
          table.capacity = size;
          table.restaurant = restaurant;
          await AppDataSource.manager.save(table);
        }
      }
    }

    console.log("Restaurantes y mesas cargados correctamente.");

    // Insertar Comensales
    for (const row of dinersSheet) {
      const diner = new Diner();
      diner.name = row.Name;
      diner.restrictions = row["Dietary Restrictions"]?.split(", ").filter((e) => e) || [];
      diner.homeLocation = row["Home Location"] || null; // Agregar homeLocation
      await AppDataSource.manager.save(diner);
    }

    console.log("Comensales cargados correctamente.");

    console.log("Base de datos inicializada con éxito.");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  } finally {
    await AppDataSource.destroy();
  }
}

seedDatabase();
