import axiosInstance from "../utils/service";
const routes = {
  getAllPosts: `/api/post/getposts`,
};

export const getAllPostsAPI = async () => {
  try {
    const res = await axiosInstance.get(routes.getAllPosts);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
