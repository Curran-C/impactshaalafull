import { useNavigate, useParams } from "react-router-dom";
import "./profileLinks.scss";
const ProfileLinks = ({ img, linkText, highlighted }) => {
  // states
  const navigate = useNavigate();
  const { id } = useParams();

  // vars
  let navLink = linkText.toLowerCase();
  navLink = navLink.replace(/ +/g, "");

  // return
  return (
    <div
      onClick={() => navigate(`/${navLink}/${id}`)}
      className={`profileLinks ${highlighted ? "highlighted" : ""}`}
    >
      <img className="img" src={img} alt="" />
      <span className="linkText">{linkText}</span>
    </div>
  );
};

export default ProfileLinks;
