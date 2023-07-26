import { useEffect, useState } from "react";
import Tile from "../Tile/Tile";
import { corporate, nopfp } from "../../assets/profile";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./feedbackCard.scss";

const FeedbackCard = ({ feedback }) => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${feedback?.id}`
        );
        setUser(res?.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  });

  return (
    <div className="feedbackCardAgain">
      <div className="feedbackprofile">
        <img className="pfp" src={user?.pfp || nopfp} alt="" />
        <div className="about">
          <h4>{user?.name}</h4>
          <Tile image={corporate} type={user?.stakeholder} />
        </div>
      </div>
      {/* <div className="feedbacktext"> */}
      <p>{feedback?.feedback}</p>
      {/* </div> */}
    </div>
  );
};

export default FeedbackCard;
