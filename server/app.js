import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.router.js";
import leadRoutes from "./routes/lead.router.js";
import noteRoutes from "./routes/note.router.js";
import activityRoutes from "./routes/activity.router.js";
import userRoutes from "./routes/user.router.js";

const app = express();

app.use(cors({
    origin: ["http://localhost:3000",]
}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/users", userRoutes);

export default app;