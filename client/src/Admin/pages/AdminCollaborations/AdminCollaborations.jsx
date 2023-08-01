import { useState } from "react";
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
  const [collabState, setCollabState] = useState("");
  const [buttonText, setButtonText] = useState("");

  const setStateToTrue = (state) => {
    setPendingState(state === "pending" ? true : false);
    setOngoingState(state === "ongoing" ? true : false);
    setCompletedState(state === "completed" ? true : false);
    setCanceledState(state === "canceled" ? true : false);

    setButtonText("");

    if (pendingState) {
      setCollabState("pending");
      setButtonText("Approve");
    }
    if (ongoingState) setCollabState("ongoing");
    if (completedState) {
      setCollabState("completed");
      setButtonText("Give Score");
    }
    if (canceledState) {
      setCollabState("canceled");
    }
  };

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
            onClick={() => setStateToTrue("pending")}
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
            onClick={() => setStateToTrue("canceled")}
          >
            Canceled
          </h1>
        </div>
        <div className="collabContainer">
          <MiniCollab
            status={collabState}
            page={"collaborations"}
            buttonText={buttonText}
          />
          <MiniCollab
            status={collabState}
            page={"collaborations"}
            buttonText={buttonText}
          />
          <MiniCollab
            status={collabState}
            page={"collaborations"}
            buttonText={buttonText}
          />
          <MiniCollab
            status={collabState}
            page={"collaborations"}
            buttonText={buttonText}
          />
          <MiniCollab
            status={collabState}
            page={"collaborations"}
            buttonText={buttonText}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCollaborations;
