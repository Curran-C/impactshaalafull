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

export default router;
