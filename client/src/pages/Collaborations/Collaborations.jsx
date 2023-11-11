import "./collaborations.scss";
import { useEffect, useState } from "react";

import CollaborationsSent from "../../components/CollaborationsSent/CollaborationsSent.jsx";
import CollaborationsRecieved from "../../components/CollaborationsRecieved/CollaborationsRecieved";
import CollaborationsAccepted from "../../components/CollaborationsAccepted/CollaborationsAccepted/CollaborationsAccepted";
import CollaborationsRejected from "../../components/CollaborationsRejected/CollaborationsRejected";
import { useOutletContext } from "react-router-dom";

const Collaborations = () => {
  const [collabRecieved, setCollabRecieved] = useState(true);
  const [collabSent, setCollabSent] = useState(false);
  const [collabAccepted, setCollabAccepted] = useState(false);
  const [collabDeclined, setCollabDeclined] = useState(false);

  const handleCollabRecieved = () => {
    setCollabRecieved(true);
    setCollabSent(false);
    setCollabAccepted(false);
    setCollabDeclined(false);
  };

  const handleCollabSent = () => {
    setCollabRecieved(false);
    setCollabSent(true);
    setCollabAccepted(false);
    setCollabDeclined(false);
  };

  const handleCollabAccepted = () => {
    setCollabRecieved(false);
    setCollabSent(false);
    setCollabAccepted(true);
    setCollabDeclined(false);
  };

  const handleCollabDeclined = () => {
    setCollabRecieved(false);
    setCollabSent(false);
    setCollabAccepted(false);
    setCollabDeclined(true);
  };

  const { setPageTitle } = useOutletContext();

  useEffect(() => {
    setPageTitle("Collaborations");
  }, []);

  return (
    <div className="collaborations-page">
      <div className="feedbacksContainer">
        <div className="buttons">
          <button
            className={collabRecieved ? "bluebutton" : "whitebutton"}
            onClick={handleCollabRecieved}
          >
            Recieved
          </button>
          <button
            className={collabSent ? "bluebutton" : "whitebutton"}
            onClick={handleCollabSent}
          >
            Requested
          </button>
          <button
            className={collabAccepted ? "bluebutton" : "whitebutton"}
            onClick={handleCollabAccepted}
          >
            Accepted
          </button>
          <button
            className={collabDeclined ? "bluebutton" : "whitebutton"}
            onClick={handleCollabDeclined}
          >
            Declined
          </button>
        </div>

        <div className="feedbacksWrapper">
          {collabRecieved && <CollaborationsRecieved />}
          {collabSent && <CollaborationsSent />}
          {collabAccepted && <CollaborationsAccepted />}
          {collabDeclined && <CollaborationsRejected />}
        </div>
      </div>
    </div>
  );
};

export default Collaborations;
