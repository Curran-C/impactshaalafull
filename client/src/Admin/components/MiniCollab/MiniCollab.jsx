import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MiniCollabProfile from "../MiniCollabProfile/MiniCollabProfile";
import "./miniCollab.scss";

const MiniCollab = ({ status, page, buttonText, fromId, toId }) => {
  const navigate = useNavigate();
  const [fromUser, setFromUser] = useState({});
  const [toUser, setToUser] = useState({});
  useEffect(() => {
    if (fromId) {
      const getFromUser = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${fromId}`
          );
          setFromUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFromUser();
    }

    if (toId) {
      const getToUser = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${toId}`
          );
          setToUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getToUser();
    }
  }, [fromId, toId]);

  return (
    <div className="miniCollab">
      <MiniCollabProfile 
        name={fromUser.companyName} 
        stakeholder={fromUser.stakeholder} 
        profileImage={fromUser.pfp}
      />
      <div className="xContainer">
        <p className="x">X</p>
        <p className="status">{status}</p>
      </div>
      <MiniCollabProfile
        name={toUser.companyName}
        stakeholder={toUser.stakeholder}
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
