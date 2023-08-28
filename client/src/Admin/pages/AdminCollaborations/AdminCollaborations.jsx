import { useState, useEffect } from "react";
import axios from "axios";
import {
  AdminSearch,
  DocumentPreview,
  LeftNavigation,
  MiniCollab,
} from "../../components";
import "./adminCollaborations.scss";

const AdminCollaborations = () => {
  const [pendingState, setPendingState] = useState(true);
  const [ongoingState, setOngoingState] = useState(false);
  const [completedState, setCompletedState] = useState(false);
  const [canceledState, setCanceledState] = useState(false);
  const [collabState, setCollabState] = useState("requested");
  const [buttonText, setButtonText] = useState("Approve");
  const [collaborations, setCollaborations] = useState([]);

  const setStateToTrue = (state) => {
    setPendingState(state === "requested" ? true : false);
    setOngoingState(state === "ongoing" ? true : false);
    setCompletedState(state === "completed" ? true : false);
    setCanceledState(state === "declined" ? true : false);

    setButtonText("");

    if (pendingState) {
      setCollabState("requested");
      setButtonText("Approve");
    } else if (ongoingState) 
      setCollabState("ongoing");
    else if (completedState) {
      setCollabState("completed");
      setButtonText("Give Score");
    }
    else if (canceledState) {
      setCollabState("declined");
    }
  };

  useEffect(() => {
    const getCollab = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/getallcollab?status=${collabState}`
        );
        setCollaborations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCollab();
  }, [collabState]);

  return (
    <div className="adminCollaborations">
      {/* <DocumentPreview /> */}
      <div className="left">
        <LeftNavigation page={"collaborations"} />
      </div>
      <div className="right">
        <AdminSearch />
        <div className="tabs">
          <h1
            className={`${pendingState && "highlighted"}`}
            onClick={() => setStateToTrue("requested")}
          >
            Pending
          </h1>
          <h1
            className={`${ongoingState && "highlighted"}`}
            onClick={() => setStateToTrue("ongoing")}
          >
            Ongoing
          </h1>
          <h1
            className={`${completedState && "highlighted"}`}
            onClick={() => setStateToTrue("completed")}
          >
            Completed
          </h1>
          <h1
            className={`${canceledState && "highlighted"}`}
            onClick={() => setStateToTrue("declined")}
          >
            Canceled
          </h1>
        </div>
        <div className="collabContainer">
          
          {collaborations.map(collab => (
            <MiniCollab
              key={collab._id}
              collabId={collab._id}
              status={collabState}
              page={"collaborations"}
              buttonText={buttonText}
              fromId={collab.fromId}
              toId={collab.toId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCollaborations;
