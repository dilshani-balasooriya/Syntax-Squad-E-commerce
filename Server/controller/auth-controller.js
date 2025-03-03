import jwt from "jsonwebtoken";
import User from "../schema/User.js";

export const Login = async (req, res) => {
  try {
    const { clerkId, email, isGoogleAuth } = req.body;

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = new User({ clerkId, email, google_auth: isGoogleAuth || false });
      await user.save();
    } else {
      if (isGoogleAuth && !user.google_auth) {
        user.google_auth = true;
        await user.save();
      }
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};