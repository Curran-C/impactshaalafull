import axiosInstance from "../utils/service";

const routes = {
  getAll:`${import.meta.env.VITE_BASE_URL}/api/notification/getAllNotificationByUser`,
  markAsRead: `${import.meta.env.VITE_BASE_URL}/api/notification/markAsRead`,
};

export const getAllNotificationsAPI = async () => {
  try {
    const res = await axiosInstance.get(routes.getAll);
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const markAsReadNotificationAPI = async (notificationId) => {
  try {
    const res = await axiosInstance.post(
      `${routes.markAsRead}/${notificationId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
