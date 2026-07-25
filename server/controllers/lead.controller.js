import User from "../models/user.model.js";
import Lead from "../models/lead.model.js";

export const createLead = async (req, res) => {
    try {
        const { name, email, phone, company, message } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "Name, email and phone are required.",
            });
        }

        const lead = await Lead.create({
            name,
            email,
            phone,
            company,
            message,
        });

        res.status(201).json({
            message: "Lead created successfully.",
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getLeads = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }
        if (req.query.assignedTo) {
            filter.assignedTo = req.query.assignedTo;
        }
        if (req.query.search) {
            filter.$or = [
                {
                    name: {
                        $regex: req.query.search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: req.query.search,
                        $options: "i",
                    },
                },
                {
                    company: {
                        $regex: req.query.search,
                        $options: "i",
                    },
                },
            ];
        }
        const total = await Lead.countDocuments(filter);
        const leads = await Lead.find(filter)
            .populate("assignedTo", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        res.status(200).json({
            success: true,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            leads,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id).populate(
            "assignedTo",
            "name email"
        );

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found.",
            });
        }

        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found.",
            });
        }

        Object.assign(lead, req.body);

        await lead.save();

        res.status(200).json({
            message: "Lead updated successfully.",
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found.",
            });
        }

        await lead.deleteOne();

        res.status(200).json({
            message: "Lead deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const assignLead = async (req, res) => {
    try {
        const { assignedTo } = req.body;

        const user = await User.findById(assignedTo);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found.",
            });
        }

        lead.assignedTo = assignedTo;

        await lead.save();

        res.status(200).json({
            message: "Lead assigned successfully.",
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found.",
            });
        }

        lead.status = status;

        await lead.save();

        res.status(200).json({
            message: "Lead status updated successfully.",
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};