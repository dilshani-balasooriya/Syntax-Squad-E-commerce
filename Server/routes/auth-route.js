import express from "express";
import {
  EditUserDetails,
  GetAllUsers,
  GetOwnersDetailProfile,
  GetProfile,
  GetUserCount,
  Login,
  Register,
} from "../controller/auth-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get-owner-profile/:listingId", GetOwnersDetailProfile);
router.get("/get-profile/:id", GetProfile);
router.get("/get-all-users", GetAllUsers);
router.get("/get-user-count", GetUserCount);
router.post("/register", Register);
router.post("/login", Login);
router.put("/edit-user/:id", verifyToken, EditUserDetails);

export default router;
