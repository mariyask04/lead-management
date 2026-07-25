import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.router.js";
import leadRoutes from "./routes/lead.router.js";
import noteRoutes from "./routes/note.router.js";
import activityRoutes from "./routes/activity.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/activity", activityRoutes);

export default app;