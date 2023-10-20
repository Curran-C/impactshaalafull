import { authorizedInstance } from "./index.js";

const routes = {
  newProjectAccomplishment: "/api/accomplishment",
  fetchAccomplishment: "/api/accomplishment",
};

export const newProjectAccomplishmentAPI = async (formData) => {
  try {
    const response = await authorizedInstance.post(
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
    const response = await authorizedInstance.get(
      `${routes.fetchAccomplishment}/${companyId}`
    );
    return response.data;
  } catch (error) {
    console.error("API Error :", error);
    throw error.response;
  }
};
