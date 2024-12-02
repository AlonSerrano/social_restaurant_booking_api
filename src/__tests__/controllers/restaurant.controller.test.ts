import request from "supertest";
import app from "../../app";
import { AppDataSource } from "../../data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Restaurant Controller", () => {
  it("should return available restaurants for valid input", async () => {
    const response = await request(app)
      .post("/restaurants/search")
      .send({
        dinerIds: [1, 2],
        time: "2024-12-01T19:30:00Z",
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should return 400 if dinerIds or time is missing", async () => {
    const response = await request(app).post("/restaurants/search").send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Diner IDs are required.");
  });
});
