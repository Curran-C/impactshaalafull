import { authorizedInstance } from "./index";

const routes = {
  forgotPassword: "/api/company/forgot-password",
  resetPassword: "/api/company/reset-password",
};

export const forgotPasswordAPI = async (payload) => {
  try {
    const res = await authorizedInstance.post(routes.forgotPassword, payload);
    return res.data;
  } catch (err) {
    console.log("Error sending forgot password: ", err);
    throw err?.response?.data;
  }
};

export const resetPasswordAPI = async (payload) => {
  try {
    const res = await authorizedInstance.post(routes.resetPassword, payload);
    return res.data;
  } catch (err) {
    console.log("Error resetting password: ", err);
    throw err?.response?.data;
  }
};
