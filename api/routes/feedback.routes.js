import express from "express";
import {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  sendAdminReplay,
  deleteFeedback,
} from "../controllers/feedback.controller.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.use((req, res, next) => {
  const token = req.cookies?.accessToken;
  const { id } = jwt.decode(token);
  if (!token || !id) {
    res.status(401).send({
      message: "You are not authenticated",
    });
  }
  req.id = id;
  next();
});

router.post("/create", createFeedback);
router.get("/company/:id", getAllFeedback);
router.get("/single/:id", getSingleFeedback);
router.post("/replay/:id", sendAdminReplay);
router.delete("/delete/:id", deleteFeedback);

export default router;
