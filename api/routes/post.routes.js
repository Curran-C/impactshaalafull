import express from "express";
import {
  createPost,
  getAllPosts,
  getPostByUser,
  getSinglePost,
  getSomePosts,
  approvePost,
  getPendingPosts,
} from "../controllers/post.controller.js";
// import { cookieAuth } from "../utils/cookieAuth.js";
import { authenticateUser } from "../middlewares/authenticateUsers.js";

const router = express.Router();

// router.use(cookieAuth);

router.get("/getsinglepost/:id", getSinglePost);
router.patch("/approvePost/:postId", approvePost);
router.get("/getPendingPost", getPendingPosts);
router.post("/create", createPost);

router.use(authenticateUser);

router.get("/getsavedposts/:id", getSomePosts);
router.get("/getpost/:id", getPostByUser);
router.get("/getposts", getAllPosts);

export default router;
