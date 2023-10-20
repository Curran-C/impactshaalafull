import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./navbar.scss";
import { hamburger, logo } from "../../assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const menu = (
    <div className="burger-menu">
      <Link to="/">
        <span>Home</span>
      </Link>
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
  );

  return (
    <div className="navbar burger">
      {/*logo*/}
      <img className="left" src={logo} alt="" onClick={() => navigate("/")} />

      {/* navlinks */}
      <div className="right">
        <Link to="/">
          <span>Home</span>
        </Link>
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

      {/* burger menu */}
      <img
        className="hamburger"
        onClick={() => setShowMenu(!showMenu)}
        src={hamburger}
        alt=""
      />
      {showMenu && menu}
    </div>
  );
};

export default Navbar;
