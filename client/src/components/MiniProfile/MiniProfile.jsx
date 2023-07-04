import "./miniProfile.scss";
import Tile from "../Tile/Tile";
import { corporate } from "../../assets/profile";

const MiniProfile = () => {
  return (
    <div className="miniProfile">
      <div className="container">
        <img className="pfp" src="https://picsum.photos/200" alt="" />
        <div className="about">
          <h4>Position Name</h4>
          <Tile image={corporate} type={"Corporate"} />
        </div>
      </div>
    </div>
  );
};

export default MiniProfile;
