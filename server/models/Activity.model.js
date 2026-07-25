import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        action: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Activity = mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;