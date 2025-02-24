import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

// Update the user
const updateUser = async (req, res) => {
    if(req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );

        const { password, ...others } = updatedUser._doc;

        return res.status(201).json(others);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

// Delete the user
const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).json("User deleted successfully");
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

// Get the user
const getUser = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.params.id });
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// Get all the users
const getAllUsers = async (req, res) => {
    try {
        // check if there's any query with-in the header
        // if there's query then take action based on the query
        // otherwise show all the data 
        const query = req.query.new;
        const users = query ? await userModel
        .find()
        .sort({ _id: -1 })
        .limit(5) : await userModel.find();

        return res.status(201).json(users);
        
    } catch (err) {
        return res.status(500).json(err.message)
    }
};

// Get users stats
const userStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear() - 1);

    try {
        const data = await userModel.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ]);

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err.message);
    }
};


export { updateUser, deleteUser, getUser, getAllUsers, userStats };