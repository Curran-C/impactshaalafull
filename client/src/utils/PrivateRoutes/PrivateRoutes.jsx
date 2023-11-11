import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import "./PrivateRoutes.scss";
import ProtectedNavBar from "../../components/ProtectedNavBar/ProtectedNavBar";
import { useDispatch } from "react-redux";
import { logoutUser, setUserAuth } from "../../store/slices/user";
import { Spin } from "antd";
import Search from "../../components/Search/Search";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import HomeRight from "../../components/HomeRight/HomeRight";

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
      <main className="private-content">
        <header>
          <ProtectedNavBar user={user} pageTitle={pageTitle} />
          <Search userName={user?.name} />
        </header>
        <div className="container">
          <ProfileLeft userId={user?._id} />
          <Outlet context={{ user, setPageLoading, setPageTitle }} />
          <HomeRight />
        </div>
      </main>
      <Spin spinning={pageLoading} fullscreen />
    </>
  );
}

export default PrivateRoutes;
