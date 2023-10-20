import { authorizedInstance } from "./index";

const routes = {
  newFeedback: "/api/feedback/create",
  fetchFeedbacksByCompany: "/api/feedback/company",
};

export const newFeedbackAPI = async (formData) => {
  try {
    const response = await authorizedInstance.post(
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
    const response = await authorizedInstance.get(
      `${routes.fetchFeedbacksByCompany}/${companyId}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error :", error);
    throw error.response;
  }
};
