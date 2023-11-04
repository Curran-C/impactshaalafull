import { Router } from "express";
// import { cookieAuth } from "../utils/cookieAuth.js";
import {
  createAccomplishment,
  getAccomplishments,
} from "../controllers/accomplishment.controller.js";
import { authenticateUser } from "../middlewares/authenticateUsers.js";

const router = Router();

router.use(authenticateUser);

router.post("/", createAccomplishment);
router.get("/:companyId", getAccomplishments);

export default router;
