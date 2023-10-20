import { authorizedInstance } from "./index";

const routes = {
  getAllPosts: "/api/post/getposts",
};

export const getAllPostsAPI = async () => {
  try {
    const res = await authorizedInstance.get(routes.getAllPosts);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
