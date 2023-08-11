import express from "express";
import { 
  createFeedback,
  getAllFeedback,
  getSingleFeedback, 
  sendAdminReplay,
  deleteFeedback,
} from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/create", createFeedback);
router.get("/all", getAllFeedback);
router.get("/single/:id", getSingleFeedback);
router.post("/replay/:id", sendAdminReplay);
router.delete("/delete/:id", deleteFeedback);

export default router;
