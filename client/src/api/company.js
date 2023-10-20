import { authorizedInstance } from "./index";

const routes = {
  forgotPassword: "/api/company/forgot-password",
  resetPassword: "/api/company/reset-password",
  search: "/api/company/search",
};

export const forgotPasswordAPI = async (payload) => {
  try {
    const res = await authorizedInstance.post(routes.forgotPassword, payload);
    return res.data;
  } catch (error) {
    console.log("Error sending forgot password: ", error);
    throw error?.response?.data;
  }
};

export const resetPasswordAPI = async (payload) => {
  try {
    const res = await authorizedInstance.post(routes.resetPassword, payload);
    return res.data;
  } catch (error) {
    console.log("Error resetting password: ", error);
    throw error?.response?.data;
  }
};

export const searchUserAPI = async (input) => {
  try {
    const res = await authorizedInstance.get(
      `${routes.search}?name=${input}`
    );
    return res.data;
  } catch (error) {
    console.log("Error searching company: ", error);
    throw error?.response?.data;
  }
};
