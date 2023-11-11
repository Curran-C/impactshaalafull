import { useNavigate } from "react-router-dom";
import { edit } from "../../assets/home";
import { corporate } from "../../assets/profile";
import Tile from "../Tile/Tile";
import "./profileCard.scss";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authUser.user);

  return (
    <div className="profileCard">
      <div className="header">
        {/* <img src={edit} alt="" /> */}
      </div>
      <div className="profileInfo">
        <img className="profilepic" src={user?.pfp} alt="" />
        <h3>{user?.name}</h3>
        <p>{user?.tagline}</p>
      </div>
      <Tile image={corporate} type={user?.stakeholder} />
      <button onClick={() => navigate(`/profile/${user?._id}`)}>
        View More
      </button>
    </div>
  );
};

export default ProfileCard;
