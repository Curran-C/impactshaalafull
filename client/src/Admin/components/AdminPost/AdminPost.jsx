import {
  NGOs,
  citizens,
  corporates,
  institutes,
} from "../../pages/adminDashboard";
import Tile from "../../../components/Tile/Tile";
import "./adminPost.scss";
import { useState } from "react";

const AdminPost = ({ onCancel }) => {
  const [corporate, setCorporate] = useState(false);
  const [ngo, setNgo] = useState(false);
  const [institute, setInstitute] = useState(false);
  const [citizen, setCitizen] = useState(false);

  const setAllStates = (stakeholder) => {
    setCorporate(stakeholder === "corporate" ? true : false);
    setCitizen(stakeholder === "citizen" ? true : false);
    setNgo(stakeholder === "ngo" ? true : false);
    setInstitute(stakeholder === "institute" ? true : false);
  };

  // functions
  const handleStakeholderSelect = (stakeholder) => {
    setAllStates(stakeholder);
  };

  return (
    <div className="adminPost">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="container">
        <form className="wrapper">
          <h1>Content to Notify / Post</h1>
          <div className="inputs">
            <input placeholder="Subject" type="text" name="" id="" />
            <textarea name="" id="" cols="30" rows="10" placeholder="Message" />
          </div>
          <div className="stakeholders">
            <Tile
              selected={corporate}
              onClicked={() => handleStakeholderSelect("corporate")}
              image={corporates}
              type={"Corporate"}
            />
            <Tile
              selected={ngo}
              onClicked={() => handleStakeholderSelect("ngo")}
              image={NGOs}
              type={"NGOs"}
            />
            <Tile
              selected={institute}
              onClicked={() => handleStakeholderSelect("institute")}
              image={institutes}
              type={"Institutes"}
            />
            <Tile
              selected={citizen}
              onClicked={() => handleStakeholderSelect("citizen")}
              image={citizens}
              type={"Citizens"}
            />
          </div>
          <div className="options">
            <div>
              <label htmlFor="notify">Notify</label>
              <input type="checkbox" id="notify" />
            </div>
            <div>
              <label htmlFor="post">Post</label>
              <input type="checkbox" id="post" />
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
