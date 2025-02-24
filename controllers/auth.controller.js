import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    let { username, email, password: reqPassword, isAdmin } = req.body;

    if (!username || !email || !reqPassword) {
      return res.status(500).json("All fields are required");
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(500).json("User already exist");
    }

    const user = await userModel.create({
      username,
      email,
      password: await bcrypt.hash(reqPassword, 10),
      isAdmin
    });

    const { password: userPassword, ...others } = user._doc;

    return res.status(201).json(others);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password: reqPassword, username } = req.body;

    const userPresent = await userModel.findOne({
      $or: [
        {
          username,
        },
        {
          email,
        },
      ],
    });
    if (!userPresent) return res.status(401).json("wrong credentials");

    const validate = await bcrypt.compare(reqPassword, userPresent.password);

    if (!validate) {
      return res.status(201).json("Invalid credentials");
    }

    const accessToken = jwt.sign(
        {
            id: userPresent._id,
            isAdmin: userPresent.isAdmin
        },
        process.env.JWT_SEC,
        {
            expiresIn: "3d"
        }
    );

    const { password: userPassword, ...others } = userPresent._doc;

    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export { registerUser, loginUser };
