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
import { authenticateUser } from "../middlewares/authenticateUsers.js";

const router = express.Router();


//Admin
router.get("/getallcollab", getCollabs)
router.get("/single/:id", getSingleCollab);
router.post("/update/:id", updateCollab);

router.use(authenticateUser);

router.post("/create", createCollab);
router.get("/all", getAllCollab);
router.get("/singletoId/:id", getCollabWithToId);
router.get("/singlefromId/:id", getCollabWithFromId);


export default router;
