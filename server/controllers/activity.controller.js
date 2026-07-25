import Activity from "../models/Activity.model.js";

export const getActivities = async (req, res) => {
  try {
    const { leadId } = req.params;

    const activities = await Activity.find({ lead: leadId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};