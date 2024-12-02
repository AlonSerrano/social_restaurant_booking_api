import { AppDataSource } from "../data-source";
import { Diner } from "../entities/Diner";
import { Reservation } from "../entities/Reservation";
import { Restaurant } from "../entities/Restaurant";
import { Table } from "../entities/Table";

export const getAvailableRestaurants = async (dinerIds: number[], time: Date) => {
  const timeStart = new Date(time);
  const timeEnd = new Date(timeStart.getTime() + 2 * 60 * 60 * 1000);

  const diners = await AppDataSource.getRepository("Diner")
    .createQueryBuilder("diner")
    .where("diner.id IN (:...dinerIds)", { dinerIds })
    .getMany();


  if (diners.length === 0) {
    return [];
  }
  const dietaryRestrictions = [...new Set(diners.flatMap((diner) => diner.restrictions || []))];


  const restaurants = await AppDataSource.getRepository(Restaurant)
    .createQueryBuilder("restaurant")
    .leftJoinAndSelect("restaurant.tables", "table")
    .leftJoinAndSelect("table.reservations", "reservation")
    .where("restaurant.endorsements @> :restrictions", { restrictions: dietaryRestrictions })
    .andWhere("table.capacity >= :capacity", { capacity: diners.length })
    .getMany();

  restaurants.forEach((restaurant) => {
    restaurant.tables = restaurant.tables.filter((table) => {
      return table.reservations.every((reservation) => {
        const reservationStart = new Date(reservation.time);
        const reservationEnd = new Date(reservationStart.getTime() + 2 * 60 * 60 * 1000);

        return reservationEnd <= timeStart || reservationStart >= timeEnd;
      });
    });
  });
  return restaurants

};

export const createReservation = async (
  tableId: number,
  dinerIds: number[],
  time: Date
) => {
  const table = await AppDataSource.getRepository(Table).findOne({
    where: { id: tableId },
    relations: ["reservations"],
  });

  if (!table) {
    throw new Error("Table not found.");
  }

  const timeStart = new Date(time);
  const timeEnd = new Date(timeStart.getTime() + 2 * 60 * 60 * 1000);

  const overlappingReservations = table.reservations.filter((reservation: any) => {
    const reservationStart = new Date(reservation.time);
    const reservationEnd = new Date(reservationStart.getTime() + 2 * 60 * 60 * 1000);

    return reservationEnd > timeStart && reservationStart < timeEnd;
  });

  if (overlappingReservations.length > 0) {
    throw new Error("Table is already reserved for the requested time.");
  }

  const diners = await AppDataSource.getRepository(Diner).findByIds(dinerIds);

  if (diners.length !== dinerIds.length) {
    throw new Error("Some diners were not found.");
  }

  const reservation = AppDataSource.getRepository(Reservation).create({
    time: timeStart,
    table: table,
    diners: diners,
  });

  await AppDataSource.getRepository(Reservation).save(reservation);

  return reservation;
};
