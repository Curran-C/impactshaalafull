import "./feedback.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import Search from "../../components/Search/Search";
import axiosInstance from "../../utils/service.js";
import HomeRight from "../../components/HomeRight/HomeRight";
import FeedBacksWritten from "../../components/FeedBacksWritten/FeedBacksWritten.jsx";
import FeedbacksRecieved from "../../components/FeedbacksRecieved/FeedbacksRecieved.jsx";

const Feedback = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [feedbackRecieved, setFeedbackRecieved] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(
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
    <div className="feedback">
      <div className="left">
        <ProfileLeft page={"feedback"} />
      </div>
      <div className="center">
        <Search userName={user.name} />
        <h1>Feedbacks</h1>
        <div className="feedbacksContainer">
          <div className="buttons">
            <button
              className={feedbackRecieved ? "bluebutton" : "whitebutton"}
              onClick={() => setFeedbackRecieved(true)}
            >
              Feedbacks Recieved
            </button>
            <button
              className={feedbackRecieved ? "whitebutton" : "bluebutton"}
              onClick={() => setFeedbackRecieved(false)}
            >
              Feedbacks Given
            </button>
          </div>

          <div className="feedbacksWrapper">
            {feedbackRecieved ? <FeedbacksRecieved /> : <FeedBacksWritten />}
          </div>
        </div>
      </div>
      <div className="right">
        <HomeRight user={user} />
      </div>
    </div>
  );
};

export default Feedback;
