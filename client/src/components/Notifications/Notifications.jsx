import { useEffect, useState } from "react";
import { corporate, nopfp } from "../../assets/profile";
import Tile from "../Tile/Tile";
import "./Notifications.scss";
import { useNavigate } from "react-router-dom";
import {
  getAllNotificationsAPI,
  markAsReadNotificationAPI,
} from "../../api/notification";
import { useSelector } from "react-redux";

const Notifications = () => {
  const user = useSelector((state) => state.authUser.user);
  const id = user?._id;
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getAllNotificationsAPI()
      .then((response) => {
        setNotifications(response.slice(0, 10));
      })
      .catch((error) => {
        console.error("Error fetching notifications: ", error);
      });
  }, [id]);

  const handleMarkAsRead = (notificationId) => {
    markAsReadNotificationAPI(notificationId)
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationId
              ? { ...notification, status: "read" }
              : notification
          )
        );
      })
      .catch((error) => {
        console.error("Error marking notification as read: ", error);
      });
  };

  const handleNotificationClick = (notification) => {
    if (
      notification.title === "New Collab Request" ||
      notification.title === "Collab Request Declined" ||
      notification.title === "Collab Request Accepted"
    ) {
      navigate(`/collaborations`);
    }
  };

  return (
    <div className="Notifications">
      {notifications.map((notification) => (
        <div
          className={
            notification.status === "unread"
              ? "notification"
              : "notification seen"
          }
          key={notification._id}
          onClick={() => handleNotificationClick(notification)}
        >
          <div className="leftn">
            <div className="about">
              <div className="pfp">
                <img
                  className="pic"
                  src={notification.fromId?.pfp || nopfp}
                  alt=""
                />
                <div className="details">
                  <span>{notification.fromId?.name || "ImpactShaala"}</span>
                  <Tile
                    image={corporate}
                    type={notification.fromId?.stakeholder || "Admin"}
                  />
                </div>
              </div>
            </div>
            <div className="message">
              <p>{notification.title}</p>
            </div>
          </div>
          <div className="rightn">
            {notification.status === "unread" && (
              <p
                style={{ cursor: "pointer" }}
                onClick={() => handleMarkAsRead(notification._id)}
              >
                Mark as read
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
