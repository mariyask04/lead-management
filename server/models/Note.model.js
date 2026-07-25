import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;