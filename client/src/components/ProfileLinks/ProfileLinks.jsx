import { NavLink } from "react-router-dom";
import "./profileLinks.scss";

const ProfileLinks = ({ img, linkText, to, ...props }) => {
  // states
  let loggedInUser = localStorage.getItem("IsUser");
  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser);
  }

  // vars
  let navLink = linkText.toLowerCase();
  navLink = navLink.replace(/ +/g, "");

  // return
  return (
    <NavLink
      to={to ? to : `/${navLink}/${loggedInUser._id}`}
      className="profileLinks"
      {...props}
    >
      <img className="img" src={img} alt="" />
      <span className="linkText">{linkText}</span>
    </NavLink>
  );
};

export default ProfileLinks;
