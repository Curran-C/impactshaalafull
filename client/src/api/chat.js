import { authorizedInstance } from "./index";

const routes = {
  startNew: "/api/chat",
  getAll: "/api/chat",
};

export const startNewChatAPI = async (userId) => {
  try {
    const res = await authorizedInstance.post(`${routes.startNew}/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error?.response?.data;
  }
};

export const getAllChatsAPI = async () => {
  try {
    const res = await authorizedInstance.get(`${routes.getAll}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error?.response?.data;
  }
};
