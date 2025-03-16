import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../schema/User.js";
import CarListing from "../schema/CarListing.js";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "5d" });
};

export const Register = async (req, res) => {
  let { fullname, email, password } = req.body;

  if (fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "Fullname must be at least 3 letters long" });
  }

  if (!email.length) {
    return res.status(403).json({ error: "Enter Email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is invalid" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullname,
    email,
    password: hashPassword,
  });

  await newUser
    .save()
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};

export const Login = async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ error: "Email not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(403).json({ error: "Invalid Password" });
    }

    const token = createToken(user._id);
    res.status(200).json({ message: "Login successfully", token, role: user.role  });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const GetProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const GetOwnersDetailProfile = async (req, res) => {
  const { listingId } = req.params;

  try {
    const carListing = await CarListing.findById(listingId);

    if (!carListing) {
      return res.status(404).json({ error: "Car listing not found." });
    }

    const ownerProfile = await User.findById(carListing.userId).select(
      "-password"
    );

    if (!ownerProfile) {
      return res.status(404).json({ error: "Owner profile not found." });
    }

    return res.status(200).json(ownerProfile);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users.length) {
      return res.status(404).json({ error: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const GetUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ count: userCount });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
