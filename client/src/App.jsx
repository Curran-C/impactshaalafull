import { Route, Routes } from "react-router-dom";

import "./index.scss";

import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/signUp/SignUp";
import Profile from "./pages/Profile/Profile";
import GoogleSignUp from "./pages/GoogleSignUp/GoogleSignUp";
import Home from "./pages/Home/Home";
import SavedPosts from "./pages/SavedPosts/SavedPosts";
import Chats from "./pages/Chat/Chats";
import Settings from "./pages/Settings/Settings";
import Collaborations from "./pages/Collaborations/Collaborations";
import AboutUs from "./pages/AboutUs/AboutUs";
import TC from "./pages/TC/TC";
import EditProfile from "./pages/EditProfile/EditProfile";
import {
  CollabDetails,
  Dashboard,
  Login,
  AdminCollaborations,
  GiveScore,
  UserActivity,
  UserActivityDetails,
  Complaints,
  Reviews,
  ApproveCollab,
} from "./Admin/pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./utils/PrivateRoutes/PrivateRoutes";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import PrivateRoutesAdmin from "./utils/PrivateRoutes/Admin/PrivateRoutesAdmin";
import { useDispatch } from "react-redux";
import { setMobileView } from "./store/slices/design";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateMobileView = () => {
      const isMobile = window.innerWidth <= 820;
      dispatch(setMobileView(isMobile));
    };
    updateMobileView();

    window.addEventListener("resize", updateMobileView);

    return () => {
      window.removeEventListener("resize", updateMobileView);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/googlesignup/:id" element={<GoogleSignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/aboutus/" element={<AboutUs />} />
        <Route path="/terms-conditions/" element={<TC />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/savedPosts" element={<SavedPosts />} />

          {/* Pending Pages below */}
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/settings/:id" element={<Settings />} />
          <Route path="/collaborations/:id" element={<Collaborations />} />
        </Route>

        <Route path="/admin" element={<Login />} />
        <Route path="/admin" element={<PrivateRoutesAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="collabdetails" element={<CollabDetails />} />
          <Route path="collaborations" element={<AdminCollaborations />} />
          <Route path="givescore" element={<GiveScore />} />
          <Route path="useractivity" element={<UserActivity />} />
          <Route path="reviews" element={<Reviews />} />
          <Route
            path="useractivity/details"
            element={
              <UserActivityDetails
                page={"details"}
                buttonText={"Send Notification"}
              />
            }
          />
          <Route
            path="useractivity/recoveraccount"
            element={<UserActivityDetails buttonText={"Recover Account"} />}
          />
          <Route path="feedback" element={<Complaints />} />
          <Route path="approvecollaboration" element={<ApproveCollab />} />
        </Route>
      </Routes>

      {/* toast */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
