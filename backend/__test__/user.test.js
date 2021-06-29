import request from "supertest";
import app from "";
import { testDbConnect, testDbDisconnect } from "../config/mongoDbMemoryServer";

beforeAll(() => {
  testDbConnect();
});

afterAll(() => {
  testDbDisconnect();
});

describe("Authentication test", () => {
  test("test for signin", async () => {
    const res = await request(app).post("/login").send({
      email: "kazeemadewole@gmail.com",
      password: "123456",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("kazeemadewole@gmail.com");
  });
});
