import React from "react";

import "./navbar.scss";
import { logo } from "../../assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      {/*logo*/}
      <img className="left" src={logo} alt="" onClick={() => navigate("/")} />

      {/* navlinks */}
      <div className="right">
        <a href="/">
          <span>Home</span>
        </a>
        <a href="#about-us">
          <span>About</span>
        </a>
        <a href="#benificiariesandpartners">
          <span>Partner</span>
        </a>
        <a href="#blog">
          <span>Blog</span>
        </a>
        <a href="/signup">
          <button>Get Started</button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
