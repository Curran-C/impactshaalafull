import express from "express";
import {
  createPost,
  getAllPosts,
  getPostByUser,
  getSinglePost,
  getSomePosts,
} from "../controllers/post.controller.js";
import { cookieAuth } from "../utils/cookieAuth.js";

const router = express.Router();

router.use(cookieAuth);

router.post("/create", createPost);
router.get("/getsavedposts/:id", getSomePosts);
router.get("/getpost/:id", getPostByUser);
router.get("/getposts", getAllPosts);
router.get("/getsinglepost/:id", getSinglePost);

export default router;
