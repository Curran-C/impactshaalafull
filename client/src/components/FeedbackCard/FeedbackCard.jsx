import { useEffect, useState } from "react";
import { corporate } from "../../assets/profile";
import Tile from "../Tile/Tile";
import "./feedbackCard.scss";
import axios from "axios";

const FeedbackCard = ({ feedback }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${feedback.id}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <div className="feedbackCard">
      <div className="feedbackprofile">
        <img className="pfp" src={user?.pfp} alt="" />
        <div className="about">
          <h4>{user?.name}</h4>
          <Tile image={corporate} type={user?.stakeholder} />
        </div>
      </div>
      <div className="feedbacktext">
        <p>{feedback?.feedback}</p>
      </div>
    </div>
  );
};

export default FeedbackCard;
