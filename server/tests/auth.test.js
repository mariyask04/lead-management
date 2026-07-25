import request from "supertest";
import app from "../app.js";

describe("Authentication APIs", () => {
    const userData = {
        name: "Test User",
        email: "test@example.com",
        password: "123456",
        role: "member",
    };

    test("Should register a new user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send(userData);

        expect(res.statusCode).toBe(201);
        expect(res.body.token).toBeDefined();
        expect(res.body.user.name).toBe(userData.name);
        expect(res.body.user.email).toBe(userData.email);
        expect(res.body.user.role).toBe(userData.role);
    });

    test("Should login an existing user", async () => {
        await request(app)
            .post("/api/auth/register")
            .send(userData);

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: userData.email,
                password: userData.password,
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.user.email).toBe(userData.email);
    });

    test("should return 401 without token", async () => {
        const res = await request(app)
            .get("/api/auth/profile");

        expect(res.statusCode).toBe(401);
    });

    test("should not login with wrong password", async () => {
        await request(app)
            .post("/api/auth/register")
            .send(userData);

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: userData.email,
                password: "wrongpassword",
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe("Invalid credentials.");
    });
})