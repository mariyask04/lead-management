import express from "express";
import { getActivities } from "../controllers/activity.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:leadId", verifyToken, getActivities);

export default router;