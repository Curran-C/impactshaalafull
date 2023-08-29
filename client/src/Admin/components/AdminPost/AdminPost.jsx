import {
  NGOs,
  citizens,
  corporates,
  institutes,
} from "../../pages/adminDashboard";
import Tile from "../../../components/Tile/Tile";
import "./adminPost.scss";
import { useState } from "react";
import axios from "axios";

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
        console.log(stakeholders);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/company/getAllUsersByStakeholder/${stakeholders}`);
        const companies = response.data;
        console.log("Users fetched:", companies)

        for (const company of companies) {
          await axios.post(`${import.meta.env.VITE_BASE_URL}/api/notification/create`, {
            toId: company._id,
            title: notificationTitle,
            message: message,
          });
        }

        alert(`Notifications sent to ${stakeholders}s`);
      } else if (postChecked) {
        //post checked
        alert("post");
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/post/create`,
          {
            title: notificationTitle,
            posDetails: message  
          }
        );
        console.log(res);
      }
    } catch (error) {
      alert(`Error sending notifications to ${stakeholders}s: ${error.message}`);
    }
  };

  return (
    <div className="adminPost">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="container">
        <form className="wrapper" onSubmit={sendNotifications}>
          <h1>Content to Notify / Post</h1>
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
            <div>
              <label htmlFor="notify">Notify</label>
              <input type="checkbox" id="notify" checked={notifyChecked} onChange={() => setNotifyChecked(!notifyChecked)} />
            </div>
            <div>
              <label htmlFor="post">Post</label>
              <input type="checkbox" id="post" checked={postChecked} onChange={() => setPostChecked(!postChecked)}/>
            </div>
          </div>
          <div className="buttons">
            <button type="submit">Send</button>
            <button className="cancel" onClick={() => onCancel(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPost;
