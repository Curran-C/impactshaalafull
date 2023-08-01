import { useState } from "react";
import { location } from "../../../assets/profile";
import {
  AdminSearch,
  CancelCollab,
  LeftNavigation,
  Stat,
} from "../../components";
import "./userActivityDetails.scss";

const UserActivityDetails = ({ buttonText, page }) => {
  const [showNotificatonDialog, setShowNotificatonDialog] = useState(false);
  const [showRemoveAccountDialog, setShowRemoveAccountDialog] = useState(false);

  return (
    <div className="userActivityDetails">
      {showNotificatonDialog && (
        <CancelCollab
          onCancel={setShowNotificatonDialog}
          title={"Notification Text"}
          button={"Send Notification"}
        />
      )}

      {showRemoveAccountDialog && (
        <CancelCollab
          onCancel={setShowRemoveAccountDialog}
          title={"Reason"}
          button={"Remove account"}
        />
      )}

      <div className="left">
        <LeftNavigation page={"useractivity"} />
      </div>
      <div className="right">
        <AdminSearch />
        <div className="userDetailsContainer">
          <img src="https://picsum.photos/200" alt="" className="pfp" />
          <h1>Name</h1>
          <div className="sidebyside">
            <p>institute</p>
            <div className="location">
              <img src={location} alt="" />
              <span>Bangalore, India</span>
            </div>
          </div>
          <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
          <a href="#" className="website">
            www.impactshaala.com
          </a>
          <div className="tags">
            <p>tag</p>
            <p>tag</p>
            <p>tag</p>
            <p>tag</p>
          </div>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis. Ut commodo efficitur neque.
          </p>
          <div className="stats">
            <Stat count={45} title={"Score"} />
            <Stat count={45} title={"Collaborations"} />
            <Stat count={45} title={"Posts"} />
          </div>

          <div className="buttons">
            {page === "details" && (
              <button
                className="white"
                onClick={() => setShowRemoveAccountDialog(true)}
              >
                Remove Account
              </button>
            )}
            <button onClick={() => setShowNotificatonDialog(true)}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivityDetails;
