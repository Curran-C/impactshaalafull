import { Link, useNavigate } from "react-router-dom";
import { corporate, location, nopfp, linkIcon } from "../../assets/profile";
import Hex from "../Hex/Hex";
import Tags from "../Tags/Tags";
import Tile from "../Tile/Tile";
import "./profileHeader.scss";
import moment from "moment";
import { useSelector } from "react-redux";

const ProfileHeader = ({ user, pageName }) => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser.user);
  return (
    <div className="profileHeader">
      <div className="coverimg">
        <img src={user?.coverPic} alt="cover image of the company" />
      </div>
      <div className="info">
        <div className="info-container">
          <div className="pfp-text">
            <img className="pfp" src={user?.pfp || nopfp} alt="" />
            <div className="company-info">
              <div className="header">
                <h3>{user?.companyName}</h3>
                {authUser?._id === user._id && (
                  <button
                    className="feedbackbutton"
                    onClick={() => navigate(`/profile/edit`)}
                  >
                    Edit Profile
                  </button>
                )}
                {pageName !== "editProfile" && (
                  <div className="stats">
                    <Hex />
                  </div>
                )}
              </div>
              <p className="description">{user?.description}</p>
              <div className="company-info-tiles">
                <Tile
                  className="bg-lightblue"
                  image={corporate}
                  type={user?.stakeholder}
                />
                <Tile image={location} type={user?.city} />
                <Link to={user?.websiteLink}>
                  <Tile
                    image={linkIcon}
                    type={user?.websiteLink || "https://companyurl.com"}
                  />
                </Link>
              </div>
            </div>
            <div className="company-about">
              <p>Joined On {moment(user?.createdAt).format("ll")}</p>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente laborum commodi reiciendis labore quibusdam vero
                exercitationem ab fugiat dolor voluptates natus facilis sit unde
                a tempore enim dicta, magni deserunt.
              </p>
            </div>
            <Tags tags={user?.tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
