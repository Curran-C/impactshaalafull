import { useNavigate, useParams } from "react-router-dom";
import "./profileLinks.scss";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const ProfileLinks = ({ img, linkText, highlighted }) => {
  // states
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState();
  const [decodedToken, setDecodedToken] = useState();

  useEffect(() => {
    const cookie = document.cookie;
    console.log(cookie);
    const cookies = cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      setAccessToken(decodeURIComponent(cookie[1]));
      accessToken && setDecodedToken(jwtDecode(accessToken));
    }
  }, [accessToken]);

  // vars
  let navLink = linkText.toLowerCase();
  navLink = navLink.replace(/ +/g, "");

  // return
  return (
    <div
      onClick={() => navigate(`/${navLink}/${decodedToken.id}`)}
      className={`profileLinks ${highlighted ? "highlighted" : ""}`}
    >
      <img className="img" src={img} alt="" />
      <span className="linkText">{linkText}</span>
    </div>
  );
};

export default ProfileLinks;
