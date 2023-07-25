import { useEffect, useState } from "react";
import { corporate } from "../../assets/profile";
import Tile from "../Tile/Tile";
import "./feedbackCard.scss";
import axios from "axios";

const FeedbackCard = ({ user }) => {
  const showCollab = () => {
    
  };

  return (
    <div className="feedbackCard">
      <div className="feedbackprofile">
        <img className="pfp" src={user?.pfp} alt="" />
        <div className="about">
          <h4>{user?.name}</h4>
          <Tile image={corporate} type={user?.stakeholder} />
        </div>
      </div>
      {/* <div className="feedbacktext"> */}
      <button onClick={showCollab}>View Collaboration Details</button>
      {/* </div> */}
    </div>
  );
};

export default FeedbackCard;
