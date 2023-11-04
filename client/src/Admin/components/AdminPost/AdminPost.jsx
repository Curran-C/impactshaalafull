import {
  NGOs,
  citizens,
  corporates,
  institutes,
} from "../../pages/adminDashboard";
import Tile from "../../../components/Tile/Tile";
import "./adminPost.scss";
import { useState } from "react";
import axiosInstance from "../../../utils/service";

import Modal from "../../../components/Modal/Modal";

const AdminPost = ({ onCancel }) => {
  const [corporate, setCorporate] = useState(false);
  const [ngo, setNgo] = useState(false);
  const [institute, setInstitute] = useState(false);
  const [citizen, setCitizen] = useState(false);
  const [notifyChecked, setNotifyChecked] = useState(false);
  const [postChecked, setPostChecked] = useState(false);
  const [stakeholders, selectedStakeholders] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [message, setMessage] = useState("");
  const [companies, setCompanies] = useState([]);

  const setAllStates = (stakeholder) => {
    setCorporate(stakeholder === "Corporate" ? true : false);
    setCitizen(stakeholder === "Working Professional" ? true : false);
    setNgo(stakeholder === "NGO" ? true : false);
    setInstitute(stakeholder === "Educational Institution" ? true : false);
    selectedStakeholders(stakeholder);
  };

  // functions
  const handleStakeholderSelect = (stakeholder) => {
    setAllStates(stakeholder);
  };

  const sendNotifications = async (e) => {
    try {
      e.preventDefault();
      if (notifyChecked) {
        if (stakeholders) {
          console.log(stakeholders);
          const response = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL
            }/api/company/getAllUsersByStakeholder/${stakeholders}`
          );
          setCompanies(response.data);
          console.log(response.data);
          for (const company of response.data) {
            await axiosInstance.post(
              `${import.meta.env.VITE_BASE_URL}/api/notification/create`,
              {
                toId: company._id,
                title: notificationTitle,
                message: message,
              }
            );
          }
          alert(`Notifications sent`);
          onCancel(false);
        } else {
          const response = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/getallusers`
          );
          setCompanies(response.data);
          for (const company of response.data) {
            await axiosInstance.post(
              `${import.meta.env.VITE_BASE_URL}/api/notification/create`,
              {
                toId: company._id,
                title: notificationTitle,
                message: message,
              }
            );
          }
          alert(`Notifications sent`);
          onCancel(false);
        }
      }
      if (postChecked) {
        const res = await axiosInstance.post(
          `${import.meta.env.VITE_BASE_URL}/api/post/create`,
          {
            title: notificationTitle,
            description: message,
            date: new Date(),
            isAdmin: true,
          }
        );
        alert("Posted");
        onCancel(false);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Modal>
      <form className="admin-post-container" onSubmit={sendNotifications}>
        <h2>Content to Notify / Post</h2>
        <div className="inputs">
          <input
            placeholder="Subject"
            type="text"
            name="title"
            id="title"
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="stakeholders">
          <Tile
            selected={corporate}
            onClicked={() => handleStakeholderSelect("Corporate")}
            image={corporates}
            type={"Corporate"}
          />
          <Tile
            selected={ngo}
            onClicked={() => handleStakeholderSelect("NGO")}
            image={NGOs}
            type={"NGOs"}
          />
          <Tile
            selected={institute}
            onClicked={() => handleStakeholderSelect("Educational Institution")}
            image={institutes}
            type={"Institutes"}
          />
          <Tile
            selected={citizen}
            onClicked={() => handleStakeholderSelect("Working Professional")}
            image={citizens}
            type={"Working Professional"}
          />
        </div>
        <div className="options">
          <div className="option">
            <label htmlFor="notify">Notify</label>
            <input
              type="checkbox"
              id="notify"
              checked={notifyChecked}
              onChange={() => setNotifyChecked(!notifyChecked)}
            />
          </div>
          <div className="option">
            <label htmlFor="post">Post</label>
            <input
              type="checkbox"
              id="post"
              checked={postChecked}
              onChange={() => setPostChecked(!postChecked)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={() => onCancel(false)}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminPost;
