import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import {
    verifyToken,
    authorizeRoles,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    getUsers
);

export default router;