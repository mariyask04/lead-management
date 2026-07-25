import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  assignLead,
  updateLeadStatus,
  getLeadStats,
} from "../controllers/lead.controller.js";

import {
  verifyToken,
  authorizeRoles,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.post("/", createLead);

// Protected
router.get("/stats", verifyToken, getLeadStats);

router.get("/", verifyToken, getLeads);

router.get("/:id", verifyToken, getLeadById);

router.patch("/:id", verifyToken, updateLead);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteLead
);

router.patch(
  "/:id/status",
  verifyToken,
  updateLeadStatus
);

router.patch(
  "/:id/assign",
  verifyToken,
  authorizeRoles("admin"),
  assignLead
);

export default router;