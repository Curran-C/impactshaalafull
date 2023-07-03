import "./profileLinks.scss";

const ProfileLinks = ({ img, linkText, highlighted }) => {
  return (
    <div className={`profileLinks ${highlighted ? "highlighted" : ""}`}>
      <img className="img" src={img} alt="" />
      <span className="linkText">{linkText}</span>
    </div>
  );
};

export default ProfileLinks;
