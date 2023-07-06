import express from "express";
import {
  findUserAndUpdate,
  getUserFromEmail,
  getuser,
  login,
  logout,
  register,
} from "../controllers/company.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.post("/alternatelogin", alternateLogin);
router.post("/verifyuser", getUserFromEmail);
router.post("/updateuser/:id", findUserAndUpdate);
router.get("/getuser/:id", getuser);
router.get("/logout", logout);

export default router;
