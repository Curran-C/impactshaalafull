import { useNavigate } from "react-router-dom";
import MiniCollabProfile from "../MiniCollabProfile/MiniCollabProfile";
import Stat from "../Stat/Stat";
import "./userInfoCard.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const UserInfoCard = ({ userId, name, stakeholder, pfp }) => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/stats/${userId}`
        );
        setUserStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserStats();
  }, [userId]);
  return (
    <div className="userInfoCard">
      <div className="cardContainer">
        <MiniCollabProfile
          name={name}
          stakeholder={stakeholder}
          profileImage={pfp}
        />
        <Stat count={userStats.userScore} title={"Score"} />
        <Stat count={userStats.collabs} title={"Collaborations"} />
        <Stat count={userStats.ongoingProjects} title={"Ongoing Projects"} />
        <Stat count={userStats.posts} title={"Posts"} />
      </div>
      <div className="buttons">
        <button
          onClick={() =>
            navigate("/admin/useractivity/details", {
              state: { userId: userId },
            })
          }
        >
          View Details
        </button>
        {/* <button className="white" onClick={() => navigate("/admin/reviews")}>
          Give Score
        </button> */}
      </div>
    </div>
  );
};

export default UserInfoCard;
