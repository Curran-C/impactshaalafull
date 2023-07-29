import "./miniCOllabProfile.scss";

const MiniCollabProfile = ({ reverse, name, stakeholder }) => {
  return (
    <div className={`miniCollabProfile ${reverse}`}>
      <img src="https://picsum.photos/200" alt="" />
      <div className="about">
        <span>Lorem ipsum</span>
        <p>Institute</p>
      </div>
    </div>
  );
};

export default MiniCollabProfile;
