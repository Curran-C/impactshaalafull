import express from "express";
import { addMessage, getMessages } from "../controllers/message.controller.js";
import { authenticateUser } from "../middlewares/authenticateUsers.js";

const router = express.Router();

router.use(authenticateUser);

router.post("/", addMessage);
router.get("/:chatId", getMessages);

export default router;
