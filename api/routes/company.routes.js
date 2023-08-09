import express from "express";
import {
  findUserAndUpdate,
  findUserByName,
  getAllUsers,
  getUserFromEmail,
  getuser,
  login,
  logout,
  register,
  getNoOfStakeholders,
  getUserActivity,
} from "../controllers/company.controller.js";

const router = express.Router();

router.get("/getuser/:id", getuser);
router.get("/logout", logout);
router.get("/getallusers", getAllUsers);

router.post("/register", register);
router.post("/login", login);
router.post("/verifyuser", getUserFromEmail);
router.post("/updateuser/:id", findUserAndUpdate);
router.post("/getuserfromname", findUserByName);

//Admin
router.get("/getstats", getNoOfStakeholders);
router.get("/getuseractivity/:userstatus", getUserActivity);

export default router;
