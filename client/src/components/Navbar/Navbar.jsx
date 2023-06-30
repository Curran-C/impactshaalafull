import React from "react";

import "./navbar.scss";
import { logo } from "../../assets";

const Navbar = () => {
  return (
    <div className="navbar">
      {/*logo*/}
      <img className="left" src={logo} alt="" />

      {/* navlinks */}
      <div className="right">
        <span>Home</span>
        <span>About</span>
        <span>Partner</span>
        <span>Blog</span>
        <a href="/signup">
          <button>Get Started</button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
