import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/googlesignup/:id" element={<GoogleSignUp />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/savedPosts/:id" element={<SavedPosts />} />
        <Route path="/chats/:id" element={<Chats />} />
        <Route path="/settings/:id" element={<Settings />} />
        <Route path="/collaborations/:id" element={<Collaborations />} />
        <Route path="/aboutus/" element={<AboutUs />} />
        <Route path="/terms-conditions/" element={<TC />} />
        <Route path="/edit/:id" element={<EditProfile />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/collabdetails" element={<CollabDetails />} />
        <Route path="/admin/collaborations" element={<AdminCollaborations />} />
        <Route path="/admin/givescore" element={<GiveScore />} />
        <Route path="/admin/useractivity" element={<UserActivity />} />
        <Route path="/admin/reviews" element={<Reviews />} />
        <Route
          path="/admin/useractivity/details"
          element={
            <UserActivityDetails
              page={"details"}
              buttonText={"Send Notification"}
            />
          }
        />
        <Route
          path="/admin/useractivity/recoveraccount"
          element={<UserActivityDetails buttonText={"Recover Account"} />}
        />
        <Route path="/admin/complaints" element={<Complaints />} />
        <Route path="/admin/approvecollaboration" element={<ApproveCollab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
