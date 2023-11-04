import axiosInstance from "../utils/service";
const routes = {
  getAllPosts: `${import.meta.env.VITE_BASE_URL}/api/post/getposts`,
};

export const getAllPostsAPI = async () => {
  try {
    const res = await axiosInstance.get(routes.getAllPosts);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
