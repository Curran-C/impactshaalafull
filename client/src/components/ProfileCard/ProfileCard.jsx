import { edit } from "../../assets/home";
import { corporate } from "../../assets/profile";
import Tile from "../Tile/Tile";
import "./profileCard.scss";

const ProfileCard = () => {
  return (
    <div className="profileCard">
      <div className="header">
        <h2>Profile</h2>
        <img src={edit} alt="" />
      </div>
      <div className="profileInfo">
        <img className="profilepic" src="https://picsum.photos/200" alt="" />
        <h2>Mr Karthik</h2>
        <p>Lorem ipsum dolor sit amhghgyjuyfyf</p>
      </div>
      <Tile image={corporate} type={"Corporate"} />
      <button>View More</button>
    </div>
  );
};

export default ProfileCard;
