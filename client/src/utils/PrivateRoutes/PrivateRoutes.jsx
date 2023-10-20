import { Navigate, Outlet } from "react-router-dom";
import "./PrivateRoutes.scss";
import Cookies from "js-cookie";

function PrivateRoutes({ admin }) {
  let user = localStorage.getItem(!admin ? "IsUser" : "IsAdmin");
  const accessToken = Cookies.get("accessToken");
  if (user) user = JSON.parse(user);

  if (!user || !accessToken) {
    localStorage.removeItem("IsUser");
    Cookies.remove("accessToken");
    return <Navigate to={!admin ? "/signUp" : "/admin"} replace />;
  }
  return <Outlet context={{ user }} />;
}

export default PrivateRoutes;
