import express from "express";
import {
  addNote,
  getNotes,
} from "../controllers/note.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:leadId", verifyToken, addNote);

router.get("/:leadId", verifyToken, getNotes);

export default router;