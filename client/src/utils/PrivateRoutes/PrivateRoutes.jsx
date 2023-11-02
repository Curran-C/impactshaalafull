import { Navigate, Outlet } from "react-router-dom";
import "./PrivateRoutes.scss";
import Cookies from "js-cookie";

function PrivateRoutes() {
  let user = localStorage.getItem("IsUser");
  const accessToken = Cookies.get("accessToken");
  if (user) user = JSON.parse(user);

  if (!user || !accessToken) {
    localStorage.removeItem("IsUser");
    Cookies.remove("accessToken");
    return <Navigate to={"/signUp"} replace />;
  }
  return <Outlet context={{ user }} />;
}

export default PrivateRoutes;
