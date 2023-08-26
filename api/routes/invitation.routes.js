import express from "express";
import {
  createInvitation,
  getAllInvitation,
  getInvitationByUser,
} from "../controllers/invitation.controller.js";

const router = express.Router();

router.post("/create", createInvitation);
router.get("/all", getAllInvitation);
router.get("/getbyuser/:id", getInvitationByUser);

export default router;
