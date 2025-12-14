const request = require("supertest");
const app = require("../src/app");

describe("Sweets API", () => {
  it("should create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .send({
        name: "TDD Sweet",
        category: "Test",
        price: 5,
        quantity: 10
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should fetch sweets list", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

