import { getAvailableRestaurants } from "../../services/restaurant.service";
import { AppDataSource } from "../../data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Restaurant Service", () => {
  it("should return available restaurants for valid diners and time", async () => {
    const restaurants = await getAvailableRestaurants([1, 2], new Date("2024-12-01T19:30:00Z"));

    expect(restaurants).toBeInstanceOf(Array);
    expect(restaurants[0]).toHaveProperty("id");
    expect(restaurants[0]).toHaveProperty("name");
  });

  it("should return an empty array if no restaurants match criteria", async () => {
    const restaurants = await getAvailableRestaurants([999], new Date("2024-12-01T19:30:00Z"));
    expect(restaurants).toEqual([]);
  });
});
