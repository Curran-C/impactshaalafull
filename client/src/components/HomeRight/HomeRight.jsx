import Preferences from "../Preferences/Preferences";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./homeRight.scss";

const HomeRight = () => {
  return (
    <div className="homeRight">
      <ProfileCard />
      <Preferences />
    </div>
  );
};

export default HomeRight;
