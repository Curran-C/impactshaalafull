import { corporate } from "../../assets/profile";
import Tile from "../Tile/Tile";
import "./feedbackCard.scss";

const FeedbackCard = () => {
  return (
    <div className="feedbackCard">
      <div className="feedbackprofile">
        <img className="pfp" src="https://picsum.photos/200" alt="" />
        <div className="about">
          <h4>Position Name</h4>
          <Tile image={corporate} type={"Corporate"} />
        </div>
      </div>
      <div className="feedbacktext">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos.
        </p>
      </div>
    </div>
  );
};

export default FeedbackCard;
