import "./collaborations.scss";
import { useEffect, useState } from "react";

import CollaborationsSent from "../../components/CollaborationsSent/CollaborationsSent.jsx";
import CollaborationsRecieved from "../../components/CollaborationsRecieved/CollaborationsRecieved";
import CollaborationsAccepted from "../../components/CollaborationsAccepted/CollaborationsAccepted/CollaborationsAccepted";
import CollaborationsRejected from "../../components/CollaborationsRejected/CollaborationsRejected";
import { useOutletContext } from "react-router-dom";

const CollabStates = {
  RECEIVED: "received",
  SENT: "sent",
  ACCEPTED: "accepted",
  DECLINED: "declined",
};

const buttonLabels = {
  [CollabStates.RECEIVED]: "Received",
  [CollabStates.SENT]: "Requested",
  [CollabStates.ACCEPTED]: "Accepted",
  [CollabStates.DECLINED]: "Declined",
};

const Collaborations = () => {
  const [collabState, setCollabState] = useState(CollabStates.RECEIVED);

  const handleCollabStateChange = (newState) => {
    setCollabState(newState);
  };

  const { setPageTitle } = useOutletContext();

  useEffect(() => {
    setPageTitle("Collaborations");
  }, []);

  return (
    <div className="collaborations-page">
      <div className="feedbacksContainer">
        <div className="buttons">
          {Object.values(CollabStates).map((state) => (
            <button
              key={state}
              className={collabState === state ? "bluebutton" : "whitebutton"}
              onClick={() => handleCollabStateChange(state)}
            >
              {buttonLabels[state]}
            </button>
          ))}
        </div>

        <div className="feedbacksWrapper">
          {collabState === CollabStates.RECEIVED && <CollaborationsRecieved />}
          {collabState === CollabStates.SENT && <CollaborationsSent />}
          {collabState === CollabStates.ACCEPTED && <CollaborationsAccepted />}
          {collabState === CollabStates.DECLINED && <CollaborationsRejected />}
        </div>
      </div>
    </div>
  );
};

export default Collaborations;
