import express from "express";
import {
  createNotification,
  getAllNotification,
  getNotificationByUser,
  markAsReadNotification,
  getNotificationCount,
} from "../controllers/notification.controller.js";
// import { cookieAuth } from "../utils/cookieAuth.js";
import { authenticateUser } from "../middlewares/authenticateUsers.js";

const router = express.Router();

// router.use(cookieAuth);
router.use(authenticateUser);

router.post("/create", createNotification);
router.get("/getall", getAllNotification);
router.get("/getAllNotificationByUser", getNotificationByUser);
router.post("/markAsRead/:notificationId", markAsReadNotification);
router.get("/getCount/:userId", getNotificationCount);

export default router;
