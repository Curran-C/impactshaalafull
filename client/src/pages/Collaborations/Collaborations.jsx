import "./collaborations.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import Search from "../../components/Search/Search";
import axios from "axios";
import HomeRight from "../../components/HomeRight/HomeRight";
import CollaborationsSent from "../../components/CollaborationsSent/CollaborationsSent.jsx";
import CollaborationsRecieved from "../../components/CollaborationsRecieved/CollaborationsRecieved";

const Collaborations = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [feedbackRecieved, setFeedbackRecieved] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <div className="collabs">
      <div className="left">
        <ProfileLeft page={"collaborations"} />
      </div>
      <div className="center">
        <Search userName={user.name} />
        <h1>Collaborations</h1>
        <div className="feedbacksContainer">
          <div className="buttons">
            <button
              className={feedbackRecieved ? "bluebutton" : "whitebutton"}
              onClick={() => setFeedbackRecieved(true)}
            >
              Collaborations Recieved
            </button>
            <button
              className={feedbackRecieved ? "whitebutton" : "bluebutton"}
              onClick={() => setFeedbackRecieved(false)}
            >
              Collaborations Requested
            </button>
          </div>

          <div className="feedbacksWrapper">
            {feedbackRecieved ? (
              <CollaborationsRecieved />
            ) : (
              <CollaborationsSent />
            )}
          </div>
        </div>
      </div>
      <div className="right">
        <HomeRight user={user} />
      </div>
    </div>
  );
};

export default Collaborations;
