import { authorizedInstance } from "./index";

const routes = {
  forgotPassword: "/api/company/forgot-password",
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
