import jwt from "jsonwebtoken";
import User from "../schema/User.js";

export const register = async (req, res) => {
  try {
    const { clerkId, email } = req.body;

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = new User({ clerkId, email });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successfully", user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};