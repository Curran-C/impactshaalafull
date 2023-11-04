import axiosInstance from "../utils/service";

const routes = {
  newFeedback: `${import.meta.env.VITE_BASE_URL}/api/feedback/create`,
  fetchFeedbacksByCompany: `${import.meta.env.VITE_BASE_URL}/api/feedback/company`,
};

export const newFeedbackAPI = async (formData) => {
  try {
    const response = await axiosInstance.post(
      routes.newFeedback,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("API Error :", error);
    throw error.response;
  }
};

export const fetchAllFeedbacksAPI = async (companyId) => {
  try {
    const response = await axiosInstance.get(
      `${routes.fetchFeedbacksByCompany}/${companyId}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error :", error);
    throw error.response;
  }
};
