import { useNavigate } from "react-router-dom";
import "./complaint.scss";
import { useState } from "react";
import CancelCollab from "../CancelCollab/CancelCollab";

const Complaint = ({ username, institute, complaint, id }) => {
  const navigate = useNavigate();
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="complaint">
      {showReply && (
        <CancelCollab title={"Reply"} onCancel={setShowReply} button={"Send"} />
      )}
      <div className="userProfile">
        <div className="pfp">
          <img src="https://picsum.photos/200" alt="pfp" />
          <div className="about">
            <h4>{username}</h4>
            <p>{institute}</p>
          </div>
        </div>

        <p>{complaint}</p>
        <div className="buttons">
          <button className="red">Delete</button>
          <button className="white" onClick={() => navigate(`/profile/${id}`)}>
            View Profile
          </button>
          <button onClick={() => setShowReply(true)} className="blue">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
