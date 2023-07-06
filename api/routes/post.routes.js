import express from "express";
import {
  createPost,
  getAllPosts,
  getPostByUser,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/getpost/:id", getPostByUser);
router.get("/getposts", getAllPosts);

export default router;
