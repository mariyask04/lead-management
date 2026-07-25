import User from "../models/User.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find(
            { role: "member" },
            "-password"
        );

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};