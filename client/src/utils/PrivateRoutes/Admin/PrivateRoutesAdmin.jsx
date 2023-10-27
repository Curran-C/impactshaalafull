import { useState } from "react";
import { LeftNavigation } from "../../../Admin/components";
import "./PrivateRoutesAdmin.scss";
import { Outlet } from "react-router-dom";

function PrivateRoutesAdmin() {
  const [pageTitle, setPageTitle] = useState("dashboard");
  return (
    <div className="admin-private-container">
      <div className="sidebar">
        <LeftNavigation page={pageTitle} />
      </div>
      <div className="content">
        <Outlet context={{ setPageTitle }} />
      </div>
    </div>
  );
}

export default PrivateRoutesAdmin;
