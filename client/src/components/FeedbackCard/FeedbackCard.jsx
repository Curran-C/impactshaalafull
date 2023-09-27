import Tile from "../Tile/Tile";
import { corporate, nopfp } from "../../assets/profile";

import "./feedbackCard.scss";

const FeedbackCard = ({ feedback: { author, date, text } }) => {
  return (
    <div className="feedbackCardAgain">
      <div className="feedbackprofile">
        <img className="pfp" src={author?.pfp || nopfp} alt="" />
        <div className="about">
          <h4>{author?.name}</h4>
          <Tile
            className="bg-lightblue"
            image={corporate}
            type={author?.stakeholder}
          />
        </div>
      </div>
      <span className="feedbacktext">
        <p>{text}</p>
      </span>
    </div>
  );
};

export default FeedbackCard;
