import axiosInstance from "../utils/service.js";

const routes = {
  newProjectAccomplishment: `${import.meta.env.VITE_BASE_URL}/api/accomplishment`,
  fetchAccomplishment: `${import.meta.env.VITE_BASE_URL}/api/accomplishment`,
};

export const newProjectAccomplishmentAPI = async (formData) => {
  try {
    const response = await axiosInstance.post(
      routes.newProjectAccomplishment,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("API Error :", error);
    throw error.response;
  }
};

export const fetchAccomplishmentAPI = async (companyId) => {
  try {
    const response = await axiosInstance.get(
      `${routes.fetchAccomplishment}/${companyId}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error :", error);
    throw error.response;
  }
};
