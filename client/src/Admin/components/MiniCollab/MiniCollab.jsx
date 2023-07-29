import MiniCollabProfile from "../MiniCollabProfile/MiniCollabProfile";
import "./miniCollab.scss";

const MiniCollab = ({ status }) => {
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
      <button className="more">View More</button>
    </div>
  );
};

export default MiniCollab;
