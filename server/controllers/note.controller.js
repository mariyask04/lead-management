import Note from "../models/Note.model.js";
import Lead from "../models/Lead.model.js";
import Activity from "../models/Activity.model.js";

export const addNote = async (req, res) => {
    try {
        const { content } = req.body;
        const { leadId } = req.params;

        if (!content) {
            return res.status(400).json({
                message: "Note content is required.",
            });
        }

        const lead = await Lead.findById(leadId);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found.",
            });
        }

        const note = await Note.create({
            lead: leadId,
            author: req.user.id,
            content,
        });

        await Activity.create({
            lead: leadId,
            user: req.user.id,
            action: "Added a note",
        });

        res.status(201).json({
            message: "Note added successfully.",
            note,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            lead: req.params.leadId,
        })
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};