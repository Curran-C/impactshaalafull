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
  sendNotification,
  removeUser,
  addScore,
  getUserStat,
  getAllUsersByStakeholder,
  getAddress,
  forgotPassword,
  resetPassword,
  searchCompany,
  uploadImage,
} from "../controllers/company.controller.js";
// import { cookieAuth } from "../utils/cookieAuth.js";
import { authenticateUser } from "../middlewares/authenticateUsers.js";


const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

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
router.post("/send/:id", sendNotification);
router.post("/remove/:id", removeUser);
router.post("/score/:id", addScore);
router.get("/stats/:id", getUserStat);

router.get("/getAllUsersByStakeholder/:stakeholder", getAllUsersByStakeholder);
router.get("/getAddress/:pincode", getAddress);

router.post("/uploadImage", uploadImage)
// router.use(cookieAuth);
router.use(authenticateUser);

router.get('/search', searchCompany)

export default router;
