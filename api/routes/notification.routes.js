import express from "express";
import {
  createNotification,
  getAllNotification,
  getNotificationByUser,
  markAsReadNotification,
  getNotificationCount
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/create", createNotification);
router.get("/getall", getAllNotification);
router.get("/getall/:id", getNotificationByUser)
router.post("/markAsRead/:notificationId", markAsReadNotification); 
router.get("/getCount/:userId", getNotificationCount);

export default router;
