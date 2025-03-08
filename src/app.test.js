const request = require("supertest");
const { app, server } = require("../src/app");

describe("Express App", () => {
  afterAll(() => {
    server.close();
  });

  it("responds to the root path", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("has a health endpoint", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "healthy");
  });
});
