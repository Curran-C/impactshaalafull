import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/signUp/SignUp";
import Profile from "./pages/Profile/Profile";
import GoogleSignUp from "./pages/GoogleSignUp/GoogleSignUp";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/googlesignup/:id" element={<GoogleSignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
