import { Navigate, Outlet } from "react-router-dom";
import "./PrivateRoutes.scss";
import Cookies from "js-cookie";

function PrivateRoutes() {
  let user = localStorage.getItem("IsUser");
  let token = localStorage.getItem("accessToken");
  // const accessToken = Cookies.get("accessToken");
  if (user) user = JSON.parse(user);
  console.log(user._id);  
  if (!user || !token) {
    localStorage.removeItem("IsUser");
    localStorage.removeItem("accessToken");
    // Cookies.remove("accessToken");
    return <Navigate to={"/signUp"} replace />;
  }
  return <Outlet context={{ user }} />;
}

export default PrivateRoutes;
