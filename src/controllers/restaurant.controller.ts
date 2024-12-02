import { Request, Response } from "express";
import { getAvailableRestaurants, createReservation } from "../services/restaurant.service";
import { searchRestaurantsSchema, reserveTableSchema } from "../validation/restaurant.validation";

export const searchRestaurants = async (req: Request, res: Response) => {
    const { error } = searchRestaurantsSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { dinerIds, time } = req.body;

    try {
        const restaurants = await getAvailableRestaurants(dinerIds, new Date(time));
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching restaurants." });
    }
};

export const reserveTable = async (req: Request, res: Response) => {
    const { error } = reserveTableSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { tableId, dinerIds, time } = req.body;

    try {
        const reservation = await createReservation(tableId, dinerIds, new Date(time));
        res.status(201).json(reservation);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(400).json({ error: err.message });
        } else {
            console.error("Unknown error:", err);
            res.status(500).json({ error: "An unknown error occurred." });
        }
    }
};
