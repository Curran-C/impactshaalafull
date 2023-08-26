import express from "express";
import { upload } from "../controllers/documents.controller.js";

const router = express.Router();

router.post("/upload", upload);

export default router;
