import { useNavigate } from "react-router-dom";
import "./complaint.scss";
import { useState, useEffect } from "react";
import CancelCollab from "../CancelCollab/CancelCollab";
import axiosInstance from "../../../utils/service";

const Complaint = ({ complaint, id }) => {
  const navigate = useNavigate();
  const [showReply, setShowReply] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const targetDetails = complaint?.target || {};

  const handleDeleteComplaint = async () => {
    try {
      await axiosInstance.delete(
        `${import.meta.env.VITE_BASE_URL}/api/feedback/delete/${id}`
      );
      alert("Complaint Deleted");
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const res = await axiosInstance.get(
  //         `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${userId}`
  //       );
  //       setUserDetails(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [userId]);

  return (
    <div className="complaint">
      {showReply && (
        <CancelCollab title={"Reply"} onCancel={setShowReply} button={"Send"} feedbackId={id} />
      )}
      <div className="userProfiles">
        <div className="userProfile">
          <div className="pfp">
            <img
              src={complaint?.author.pfp || "https://res.cloudinary.com/drjt9guif/image/upload/v1692264454/TheCapitalHub/users/default-user-avatar_fe2ky5.webp"}
              alt="pfp"
            />
            <div className="about">
              <h4>{complaint?.author.companyName}</h4>
              <p>{complaint?.author.stakeholder}</p>
            </div>
          </div>
        </div>
        {targetDetails && (
          <div className="userProfile">
            <div className="pfp">
              <img
                src={targetDetails.pfp || "https://res.cloudinary.com/drjt9guif/image/upload/v1692264454/TheCapitalHub/users/default-user-avatar_fe2ky5.webp"}
                alt="pfp"
              />
              <div className="about">
                <h4>{targetDetails.companyName}</h4>
                <p>{targetDetails.stakeholder}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <p style={{ textAlign: "center" }}>{complaint?.text}</p>
      <div className="buttons">
        <button className="red" onClick={handleDeleteComplaint}>
          Delete
        </button>
        <button
          className="white"
          onClick={() => navigate(`/profile/${complaint.author._id}`)}
        >
          View Author Profile
        </button>
        <button
          className="white"
          onClick={() => navigate(`/profile/${complaint.target._id}`)}
        >
          View Target Profile
        </button>
        <button onClick={() => setShowReply(true)} className="blue">
          Reply
        </button>
      </div>

    </div>
  );
};

export default Complaint;