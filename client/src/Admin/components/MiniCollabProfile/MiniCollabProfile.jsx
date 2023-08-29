import "./miniCollabProfile.scss";

const MiniCollabProfile = ({ reverse, name, stakeholder, profileImage }) => {
  return (
    <div className={`miniCollabProfile ${reverse}`}>
      <img src={profileImage || "https://picsum.photos/200"} alt="" />
      <div className="about">
        <span>{name}</span>
        <p>{stakeholder}</p>
      </div>
    </div>
  );
};

export default MiniCollabProfile;
