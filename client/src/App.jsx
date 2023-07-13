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
import Feedback from "./pages/Feedback/Feedback";

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
        <Route path="/feedbacks/:id" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
