import express from "express";
import {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  sendAdminReplay,
  deleteFeedback,
} from "../controllers/feedback.controller.js";
// import { cookieAuth } from "../utils/cookieAuth.js";
import { authenticateUser } from "../middlewares/authenticateUsers.js";

const router = express.Router();

// router.use(cookieAuth);
// router.use(authenticateUser);

router.post("/create", createFeedback);
router.get("/company/:id", getAllFeedback);
router.get("/single/:id", getSingleFeedback);
router.post("/replay/:id", sendAdminReplay);
router.delete("/delete/:id", deleteFeedback);

export default router;
