import { useNavigate } from "react-router-dom";
import MiniCollabProfile from "../MiniCollabProfile/MiniCollabProfile";
import "./miniCollab.scss";

const MiniCollab = ({ status, page, buttonText }) => {
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
      <div className="buttons">
        {(page === "dashboard" || page === "collaborations") && (
          <button
            onClick={() => navigate("/admin/collabdetails")}
            className="more"
          >
            View More
          </button>
        )}
        {page === "collaborations" && buttonText !== "" && (
          <button
            onClick={() =>
              buttonText === "Approve"
                ? navigate("/admin/approvecollaboration")
                : navigate("/admin/givescore")
            }
            className="more white"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default MiniCollab;
