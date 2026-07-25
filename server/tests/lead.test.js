import request from "supertest";
import app from "../app.js";

describe("Lead APIs", () => {
    let adminToken;
    let memberId;
    let leadId;

    beforeEach(async () => {
        const adminRes = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin",
                email: "admin@test.com",
                password: "123456",
                role: "admin",
            });
        adminToken = adminRes.body.token;

        const memberRes = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Member",
                email: "member@test.com",
                password: "123456",
                role: "member",
            });
        memberId = memberRes.body.user.id;
    });

    test("Should create a new lead", async () => {
        const res = await request(app)
            .post("/api/leads")
            .send({
                name: "Rahul Sharma",
                email: "rahul@test.com",
                phone: "9876543210",
                company: "TechNova",
                message: "Interested in demo",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.lead.name).toBe("Rahul Sharma");
        leadId = res.body.lead._id;
    });

    test("Should update lead status", async () => {
        const createLead = await request(app)
            .post("/api/leads")
            .send({
                name: "Rahul",
                email: "rahul@test.com",
                phone: "9999999999",
            });

        leadId = createLead.body.lead._id;

        const res = await request(app)
            .patch(`/api/leads/${leadId}/status`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                status: "Contacted",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.lead.status).toBe("Contacted");
    });

    test("should assign lead to a member", async () => {
        const createLead = await request(app)
            .post("/api/leads")
            .send({
                name: "Rahul",
                email: "rahul@test.com",
                phone: "9999999999",
            });

        leadId = createLead.body.lead._id;

        const res = await request(app)
            .patch(`/api/leads/${leadId}/assign`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                assignedTo: memberId,
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.lead.assignedTo).toBe(memberId);
    });
});