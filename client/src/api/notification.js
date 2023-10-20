import { authorizedInstance } from "./index";

const routes = {
  getAll: "/api/notification/getall",
  markAsRead: "/api/notification/markAsRead",
};

export const getAllNotificationsAPI = async () => {
  try {
    const res = await authorizedInstance.get(routes.getAll);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const markAsReadNotificationAPI = async (notificationId) => {
  try {
    const res = await authorizedInstance.post(
      `${routes.markAsRead}/${notificationId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
