import express from "express";
import {
  createCollab,
  getAllCollab,
  getCollabWithFromId,
  getCollabWithToId,
  getSingleCollab,
  updateCollab,
  getCollabs,
} from "../controllers/collaborations.controller.js";

const router = express.Router();

router.post("/create", createCollab);
router.post("/update/:id", updateCollab);
router.get("/all", getAllCollab);
router.get("/single/:id", getSingleCollab);
router.get("/singletoId/:id", getCollabWithToId);
router.get("/singlefromId/:id", getCollabWithFromId);

//Admin
router.get("/getallcollab", getCollabs)

export default router;
