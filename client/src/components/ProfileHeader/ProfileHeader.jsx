import { corporate, location, nopfp } from "../../assets/profile";
import Hex from "../Hex/Hex";
import Tags from "../Tags/Tags";
import Tile from "../Tile/Tile";
import "./profileHeader.scss";
import moment from "moment";

const ProfileHeader = ({ user, pageName }) => {
  return (
    <div className="profileHeader">
      <div className="coverimg">
        <img src={user?.coverPic} alt="" />
      </div>
      <div className="info">
        <div className="info-container">
          <div className="pfp-text">
            <img className="pfp" src={user?.pfp || nopfp} alt="" />
            <div className="company-info">
              <h3>{user?.companyName}</h3>
              <div className="company-info-tiles">
                <Tile image={corporate} type={user?.stakeholder} />
                <Tile image={location} type={user?.city} />
              </div>
            </div>
            <div className="company-about">
              <p>Joined On {moment(user?.createdAt).format("ll")}</p>
              <p>{user?.description}</p>
            </div>
            <Tags tags={user?.tags} />
          </div>
          {pageName !== "editProfile" && (
            <div className="stats">
              <Hex />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
