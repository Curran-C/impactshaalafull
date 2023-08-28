import Post from "../modals/post.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createPost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");
  else {
    const { id } = jwt.decode(token);
    try {
      const newPost = new Post({
        ...req.body,
        createdById: id,
      });
      await newPost.save();
      res.status(200).send(newPost);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getPostByUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");
  else {
    try {
      const post = await Post.find({ createdById: req.params.id });
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const getAllPosts = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");
  else {
    try {
      const post = await Post.find();
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const getSomePosts = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) res.status(401).send("You are not authenticated");
  else {
    try {
      const posts = await Post.findById(req.params.id);
      res.status(200).send(posts);
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

export { createPost, getPostByUser, getAllPosts, getSomePosts, getSinglePost };
