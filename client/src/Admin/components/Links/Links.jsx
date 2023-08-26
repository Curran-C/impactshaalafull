import "./links.scss";
import { useNavigate } from "react-router-dom";

const Links = ({ img, linkText, highlighted, navLink }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/admin/${navLink}`)}
      className={`Links ${highlighted ? "highlightedAdmin" : ""}`}
    >
      <img className="img" src={img} alt="" />
      <span className="linkText">{linkText}</span>
    </div>
  );
};

export default Links;
