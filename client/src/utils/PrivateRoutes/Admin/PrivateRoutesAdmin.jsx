import { useState } from "react";
import { LeftNavigation } from "../../../Admin/components";
import "./PrivateRoutesAdmin.scss";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

function PrivateRoutesAdmin() {
  const [pageTitle, setPageTitle] = useState("dashboard");

  let user = localStorage.getItem("IsAdmin");
  let accessToken = Cookies.get("accessToken");

  // Temporary fix only. No backend for now.
  if (user) user = JSON.parse(user);

  if (accessToken) {
    accessToken = jwtDecode(accessToken)?._id;
  }

  if (!user || !accessToken) {
    localStorage.removeItem("IsAdmin");
    Cookies.remove("accessToken");
    return <Navigate to={"/admin"} replace />;
  }

  return (
    <div className="admin-private-container">
      <div className="sidebar">
        <LeftNavigation page={pageTitle} />
      </div>
      <div className="content">
        <Outlet context={{ setPageTitle, admin: user }} />
      </div>
    </div>
  );
}

export default PrivateRoutesAdmin;
