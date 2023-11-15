import axiosInstance from "../utils/service";

const routes = {
  forgotPassword: `/api/company/forgot-password`,
  resetPassword: `/api/company/reset-password`,
  search: `/api/company/search`,
  getUser: `/api/company/getuser`,
  updateUser: `/api/company/updateUser`,
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
    const res = await axiosInstance.get(`${routes.search}?name=${input}`);
    return res.data;
  } catch (error) {
    console.log("Error searching company: ", error);
    throw error?.response?.data;
  }
};

export const getUserAPI = async (_id) => {
  try {
    const res = await axiosInstance.get(`${routes.getUser}/${_id}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching company: ", error);
    throw error?.response?.data;
  }
};

export const updateUserAPI = async (_id, formData) => {
  try {
    const res = await axiosInstance.post(
      `${routes.updateUser}/${_id}`,
      formData
    );
    return res.data;
  } catch (error) {
    console.log("Error updating company: ", error);
    throw error?.response?.data;
  }
};
