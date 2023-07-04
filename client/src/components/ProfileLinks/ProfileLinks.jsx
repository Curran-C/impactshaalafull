import { useNavigate } from "react-router-dom";
import "./profileLinks.scss";

const ProfileLinks = ({ img, linkText, highlighted }) => {
  const navigate = useNavigate();
  let navLink = linkText.toLowerCase();
  navLink = navLink.replace(/ +/g, "");

  return (
    <div
      onClick={() => navigate(`/${navLink}/1`)}
      className={`profileLinks ${highlighted ? "highlighted" : ""}`}
    >
      <img className="img" src={img} alt="" />
      <span className="linkText">{linkText}</span>
    </div>
  );
};

export default ProfileLinks;
