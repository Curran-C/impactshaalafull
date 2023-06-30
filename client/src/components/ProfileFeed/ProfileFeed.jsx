
import { corporate, location, nopfp } from "../../assets/profile";
import Hex from "../Hex/Hex";
import ProfileLinks from "../ProfileLinks/ProfileLinks";
import "./profileFeed.scss";


const ProfileFeed = ({ user }) => {
  return (
    <div className="profile">
      {console.log(user)}
      <div className="coverimg">
        <img src={user.coverPic} alt="" />
      </div>
      <div className="info">
        <div className="info-container">
          <div className="pfp-text">
            <img className="pfp" src={user.pfp || nopfp} alt="" />
            <div className="company-info">
              <h3>{user.companyName}</h3>
              <div className="profile-links">
                <img className="img" src={corporate} alt="" />
                <span className="linkText">{user.stakeholder}</span>
              </div>
              <div className="profile-links">
                <img className="img" src={location} alt="" />
                <span className="linkText">{user.city}</span>
              </div>
            </div>
            <div className="company-about">
              <p>{user.description}</p>
            </div>
          </div>
          <div className="stats">
            <Hex />
          </div>
        </div>
      </div>

      <div className="feed">
        <div className="achievements">
          <h2>Achieviements</h2>
          <div className="achievements-container">
            <div className="placeholder"></div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
          </div>
        </div>

        <div className="posts">
          <h2>Your Posts</h2>
          <div className="post-placeholder"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFeed;
