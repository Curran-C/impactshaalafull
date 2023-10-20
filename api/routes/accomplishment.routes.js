import { Router } from "express";
import { cookieAuth } from "../utils/cookieAuth.js";
import {
  createAccomplishment,
  getAccomplishments,
} from "../controllers/accomplishment.controller.js";

const router = Router();

router.use(cookieAuth);

router.post("/", createAccomplishment);
router.get("/:companyId", getAccomplishments);

export default router;
