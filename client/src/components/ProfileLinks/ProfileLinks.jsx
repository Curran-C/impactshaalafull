import { useNavigate } from "react-router-dom";
import "./profileLinks.scss";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const ProfileLinks = ({ img, linkText, highlighted, to }) => {
  // states
  const navigate = useNavigate();
  // const [accessToken, setAccessToken] = useState();
  // const [decodedToken, setDecodedToken] = useState();
  const loggedInUser = JSON.parse(localStorage.getItem("IsUser"));

  // useEffect(() => {
  //   const cookie = document.cookie;
  //   const cookies = cookie.split("; ");
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].split("=");
  //     setAccessToken(decodeURIComponent(cookie[1]));
  //     accessToken && setDecodedToken(jwtDecode(accessToken));
  //   }
  // }, [accessToken]);

  // vars
  let navLink = linkText.toLowerCase();
  navLink = navLink.replace(/ +/g, "");

  // return
  return (
    <div
      onClick={() => navigate(to ? to : `/${navLink}/${loggedInUser._id}`)}
      className={`profileLinks ${highlighted ? "highlighted" : ""}`}
    >
      <img className="img" src={img} alt="" />
      <span className="linkText">{linkText}</span>
    </div>
  );
};

export default ProfileLinks;
