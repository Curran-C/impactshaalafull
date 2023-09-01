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
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/notification/create`, {
          toId: userId,
           // title: "Important Notification from ImpactShaala",
          title: message,
          message: message,
        });
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
        if (res.status === 200) {
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
        console.log(res.data);

        //send notification to both users
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/notification/create`, {
          toId: res.data.fromId,
          title: "Collab Request Declined",
          message: message,
        });

        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/notification/create`, {
          toId: res.data.toId,
          title: "Collab Request Declined",
          message: message,
        });

        const resToCurrentUser = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${res.data.fromId}`,
          {
            $push: { collaborationIdsDeclined: collabId },
            $pull: {
              collaborationIds: collabId,
              collaborationIdsAccepted: collabId
            }
          }
        );

        const resToOtherUser = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${res.data.toId}`,
          {
            $push: { collaborationIdsDeclined: collabId },
            $pull: {
              collaborationIds: collabId,
              collaborationIdsAccepted: collabId
            }
          }
        );
        //send mail to both users
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/send/${resToCurrentUser.data._id}`, {
          name: resToCurrentUser.data.name,
          email: resToCurrentUser.data.email,
          subject: "Collab Request Declined",
          message: message
        }
        )
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/company/send/${resToOtherUser.data._id}`, {
          name: resToOtherUser.data.name,
          email: resToOtherUser.data.email,
          subject: "Collab Request Declined",
          message: message
        }
        )
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
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/notification/create`, {
          toId: res.data.userId,
          // title: "Replay for your feedback",
          title: message,
          message: message,
        });
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
