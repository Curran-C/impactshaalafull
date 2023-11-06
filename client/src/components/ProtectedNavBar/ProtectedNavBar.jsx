import "./ProtectedNavBar.scss";
import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { logo } from "../../assets";
import ProfileLeft from "../ProfileLeft/ProfileLeft";
import { bell, chat } from "../../assets/home";
import Notifications from "../Notifications/Notifications";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/service";
import HomeRight from "../HomeRight/HomeRight";

const ProtectedNavBar = ({ user, pageTitle }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const showDrawer = () => setIsDrawerOpen(true);
  const onClose = () => setIsDrawerOpen(false);

  const [shownotifications, setShownotifications] = useState(false);
  const [notifCount, setNotifCount] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/notification/getCount/${
            user?._id
          }`
        );
        if (response.data.count >= 100) setNotifCount("99+");
        else setNotifCount(response.data.count);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch notification count when component mounts
    fetchNotificationCount();
  }, []);

  return (
    <nav className="protected-navbar">
      {/* <Link to={"/home"} className="logo">
        <img src={logo} alt="impactshaala" height={50} />
      </Link> */}
      <Button className="bg-primary" type="default" onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <h3>{pageTitle || "ImpactShaala"}</h3>

      <div className="icons">
        <div className="notification-container">
          <img
            onClick={() => setShownotifications(!shownotifications)}
            src={bell}
            alt="notifications"
            style={{ cursor: "pointer" }}
          />
          {notifCount ? <div className="notifcount">{notifCount}</div> : ""}
          {shownotifications && <Notifications />}
        </div>
        {/* <img
            onClick={() => navigate(`/chats`)}
            style={{ cursor: "pointer" }}
            src={chat}
            alt="chat"
          /> */}
        {/* <Button className="barsMenu" type="default" onClick={showDrawer}>
          <MenuOutlined />
        </Button> */}
      </div>
      <Drawer
        title="ImpactShaala"
        placement="left"
        closable={false}
        onClose={onClose}
        open={isDrawerOpen}
        className="protected-navbar-drawer"
      >
        <ProfileLeft />
        <HomeRight />
      </Drawer>
    </nav>
  );
};

export default ProtectedNavBar;
