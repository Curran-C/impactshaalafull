import "./cancelCollab.scss";
import axios from "axios";
import { useState } from 'react';

const CancelCollab = ({ onCancel, title, button, userId, collabId, feedbackId }) => {
  const [message, setMessage] = useState('');
  const handleSubmit = async () => {
    try {
      if (button === "Send Notification") {
        const user = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${userId}`
        );
        const requestbody = {
          subject: "Important Notification from ImpactShaala",
          name: user.data.name,
          email: user.data.email,
          message: message,
        }
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/send/${userId}`, requestbody
        );
        if (res.data.status === 200) {
          alert("Notification Sent");
          onCancel(false);
        }
      }
      else if (button === "Remove account") {
        const user = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${userId}`
        );
        const requestbody = {
          reason: message
        }
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/remove/${userId}`, requestbody
        );
        if(res.status === 200) {
          alert("Account Removed")
          onCancel(false);
        }
      }
      else if (button === "Cancel Collaboration") {
        console.log(collabId);
        const requestBody = {
          completed: "declined"
        }
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/update/${collabId}`, requestBody
        );
        if (res.status === 200) {
          alert("Collabaration Cancelled");
          onCancel(false);
        }
      } else if (button === "Send") {
        const requestBody = {
          replay: message,
        }
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/feedback/replay/${feedbackId}`, requestBody
        );
        if (res.status === 200) {
          alert("Replay Sent");
          onCancel(false);
        }
      }
    }
      catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="cancelCollab">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="wrapper">
        <h1>{title}</h1>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>{button}</button>
      </div>
    </div>
  );
};

export default CancelCollab;
