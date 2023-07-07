import Preferences from "../Preferences/Preferences";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./homeRight.scss";

const HomeRight = ({ user }) => {
  return (
    <div className="homeRight">
      <ProfileCard user={user} />
      <Preferences />
    </div>
  );
};

export default HomeRight;
