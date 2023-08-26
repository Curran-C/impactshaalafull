import express from "express";
import {
  createNotification,
  getAllNotification,
  getNotificationByUser,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/create", createNotification);
router.get("/getall", getAllNotification);
router.get("/getall/:id", getNotificationByUser)
export default router;
