import Post from "../modals/post.modal.js";

const createPost = async (req, res) => {
  try {
    const newPost = new Post({
      ...req.body,
    });
    await newPost.save();
    res.status(200).send(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
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
  try {
    const post = await Post.find({ createdById: req.params.id });
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getSomePosts = async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};

export { createPost, getPostByUser, getAllPosts, getSomePosts, getSinglePost };
