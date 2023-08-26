import { useNavigate } from "react-router-dom";
import "./complaint.scss";
import { useState, useEffect } from "react";
import CancelCollab from "../CancelCollab/CancelCollab";
import axios from "axios";

const Complaint = ({ userId, complaint, id }) => {
  const navigate = useNavigate();
  const [showReply, setShowReply] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  const handleDeleteComplaint = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/feedback/delete/${id}`
      );
      alert("Complaint Deleted");
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${userId}`
        );
        setUserDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userId]);

  return (
    <div className="complaint">
      {showReply && (
        <CancelCollab title={"Reply"} onCancel={setShowReply} button={"Send"} />
      )}
      <div className="userProfile">
        <div className="pfp">
          <img src={userDetails.pfp || "https://picsum.photos/200"} alt="pfp" />
          <div className="about">
            <h4>{userDetails.companyName}</h4>
            <p>{userDetails.stakeholder}</p>
          </div>
        </div>

        <p>{complaint}</p>
        <div className="buttons">
          <button className="red" onClick={handleDeleteComplaint}>Delete</button>
          <button className="white" onClick={() => navigate("/admin/useractivity/details", { state: {userId: userDetails._id } })}>
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
