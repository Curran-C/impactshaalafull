import axiosInstance from "../utils/service";
const routes = {
  startNew: `${import.meta.env.VITE_BASE_URL}/api/chat`,
  getAll: `${import.meta.env.VITE_BASE_URL}/api/chat`,
};

export const startNewChatAPI = async (userId) => {
  try {
    const res = await axiosInstance.post(`${routes.startNew}/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error?.response?.data;
  }
};

export const getAllChatsAPI = async () => {
  try {
    const res = await axiosInstance.get(`${routes.getAll}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error?.response?.data;
  }
};
