import { useNavigate } from "react-router-dom";
import MiniCollabProfile from "../MiniCollabProfile/MiniCollabProfile";
import "./miniCollab.scss";

const MiniCollab = ({ status, page }) => {
  const navigate = useNavigate();

  return (
    <div className="miniCollab">
      <MiniCollabProfile name={"Lorem Ipsum"} stakeholder={"Institute"} />
      <div className="xContainer">
        <p className="x">X</p>
        <p className="status">{status}</p>
      </div>
      <MiniCollabProfile
        name={"Lorem Ipsum"}
        stakeholder={"Institute"}
        reverse={"reverse"}
      />
      {page === "dashboard" && (
        <button
          onClick={() => navigate("/admin/collabdetails")}
          className="more"
        >
          View More
        </button>
      )}
    </div>
  );
};

export default MiniCollab;
