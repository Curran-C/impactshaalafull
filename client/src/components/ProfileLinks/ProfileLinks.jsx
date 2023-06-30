import "./profileLinks.scss";

const ProfileLinks = (props) => {
  return (
    <div className="profileLinks">
      <img className="img" src={props.img} alt="" />
      <span className="linkText">{props.linkText}</span>
    </div>
  );
};

export default ProfileLinks;
