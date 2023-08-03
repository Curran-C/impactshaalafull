import { useNavigate } from "react-router-dom";
import MiniCollabProfile from "../MiniCollabProfile/MiniCollabProfile";
import Stat from "../Stat/Stat";
import "./userInfoCard.scss";

const UserInfoCard = () => {
  const navigate = useNavigate();

  return (
    <div className="userInfoCard">
      <div className="cardContainer">
        <MiniCollabProfile name={"Lorem Ipsum"} stakeholder={"Industry"} />
        <Stat count={45} title={"Score"} />
        <Stat count={45} title={"Collaborations"} />
        <Stat count={45} title={"Ongoing Projects"} />
        <Stat count={45} title={"Posts"} />
      </div>
      <div className="buttons">
        <button onClick={() => navigate("/admin/useractivity/details")}>
          View Details
        </button>
        <button className="white" onClick={() => navigate("/admin/reviews")}>
          Give Score
        </button>
      </div>
    </div>
  );
};

export default UserInfoCard;
