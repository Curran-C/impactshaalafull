import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import "./PrivateRoutes.scss";
import ProtectedNavBar from "../../components/ProtectedNavBar/ProtectedNavBar";
import { useDispatch } from "react-redux";
import { logoutUser, setUserAuth } from "../../store/slices/user";
import { Spin } from "antd";

function PrivateRoutes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("IsUser");
    const token = localStorage.getItem("accessToken");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch(setUserAuth({ user: parsedUser, token }));
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }

    if (!user || !token) {
      dispatch(logoutUser());
      return <Navigate to={"/signUp"} replace />;
    }
  }, [location.pathname]);

  if (user === false) return;

  return (
    <>
      <ProtectedNavBar user={user} pageTitle={pageTitle} />
      <main className="private-content">
        <Outlet context={{ user, setPageLoading, setPageTitle }} />
      </main>
      <Spin spinning={pageLoading} fullscreen />
    </>
  );
}

export default PrivateRoutes;
