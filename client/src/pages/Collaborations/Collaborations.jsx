import "./collaborations.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import Search from "../../components/Search/Search";
import axiosInstance from "../../utils/service.js";
import HomeRight from "../../components/HomeRight/HomeRight";
import CollaborationsSent from "../../components/CollaborationsSent/CollaborationsSent.jsx";
import CollaborationsRecieved from "../../components/CollaborationsRecieved/CollaborationsRecieved";
import CollaborationsAccepted from "../../components/CollaborationsAccepted/CollaborationsAccepted/CollaborationsAccepted";
import CollaborationsRejected from "../../components/CollaborationsRejected/CollaborationsRejected";
import { Spin } from 'antd';

const Collaborations = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [collabRecieved, setCollabRecieved] = useState(true);
  const [collabSent, setCollabSent] = useState(false);
  const [collabAccepted, setCollabAccepted] = useState(false);
  const [collabDeclined, setCollabDeclined] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

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
      <div className="right">
        <HomeRight user={user} />
      </div>
      <Spin spinning={loading} fullscreen />
    </div>
  );
};

export default Collaborations;
