import axiosInstance from "../utils/service";

const routes = {
  forgotPassword: `${import.meta.env.VITE_BASE_URL}/api/company/forgot-password`,
  resetPassword: `${import.meta.env.VITE_BASE_URL}/api/company/reset-password`,
  search: `${import.meta.env.VITE_BASE_URL}/api/company/search`,
};

export const forgotPasswordAPI = async (payload) => {
  try {
    const res = await axiosInstance.post(routes.forgotPassword, payload);
    return res.data;
  } catch (error) {
    console.log("Error sending forgot password: ", error);
    throw error?.response?.data;
  }
};

export const resetPasswordAPI = async (payload) => {
  try {
    const res = await axiosInstance.post(routes.resetPassword, payload);
    return res.data;
  } catch (error) {
    console.log("Error resetting password: ", error);
    throw error?.response?.data;
  }
};

export const searchUserAPI = async (input) => {
  try {
    const res = await axiosInstance.get(
      `${routes.search}?name=${input}`
    );
    return res.data;
  } catch (error) {
    console.log("Error searching company: ", error);
    throw error?.response?.data;
  }
};
