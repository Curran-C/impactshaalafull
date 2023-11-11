import "./ProtectedNavBar.scss";
import React, { useEffect, useState } from "react";
import { Badge, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import ProfileLeft from "../ProfileLeft/ProfileLeft";
import Notifications from "../Notifications/Notifications";
import axiosInstance from "../../utils/service";
import HomeRight from "../HomeRight/HomeRight";
import { BsBell, BsBellFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PiChats } from "react-icons/pi";
import { logo } from "../../assets/index";

const ProtectedNavBar = ({ user, pageTitle }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const showDrawer = () => setIsDrawerOpen(true);
  const onClose = () => setIsDrawerOpen(false);

  const [shownotifications, setShownotifications] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/notification/getCount/${
            user?._id
          }`
        );
        setNotifCount(response.data.count);
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
          <Badge count={notifCount} overflowCount={10}>
            {shownotifications ? (
              <BsBellFill
                onClick={() => setShownotifications(!shownotifications)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <BsBell
                onClick={() => setShownotifications(!shownotifications)}
                style={{ cursor: "pointer" }}
              />
            )}
            {shownotifications && <Notifications />}
          </Badge>
          <PiChats onClick={() => navigate("/chats")} />
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
        title={<img src={logo} alt="ImpactShaala" style={{ width: "70%" }} />}
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
