const request = require("supertest");
const app = require("../server");
const {
  testDbConnect,
  testDbDisconnect,
} = require("../config/mongoDbMemoryServer");

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
