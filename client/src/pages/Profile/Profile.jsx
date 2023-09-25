import axios from "axios";
import ProfileFeed from "../../components/ProfileFeed/ProfileFeed";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./profile.scss";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import NameDate from "../../components/NameDate/NameDate";
import { date } from "../../utils/date";
import jwtDecode from "jwt-decode";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import HomeRight from "../../components/HomeRight/HomeRight";

const Profile = () => {
  // states
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState();
  const [decodedToken, setDecodedToken] = useState();
  const [feedbackFrom, setFeedbackFrom] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getCookie = () => {
    const cookie = document.cookie;
    const cookies = cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      setAccessToken(decodeURIComponent(cookie[1]));
      accessToken && setDecodedToken(jwtDecode(accessToken));
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        // const res = await fetch(
        //   `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        // );
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCookie();
    console.log(accessToken);
    getUser();
  }, [accessToken]);

  const handleFeedbackShow = (props) => {
    setFeedbackFrom(props);
  };

  return (
    <div className="companyProfile">
      {feedbackFrom && <FeedbackForm onCancel={handleFeedbackShow} />}
      <div className="profileContainer">
        <ProfileLeft page={"profile"} />
        <div className="profileDetails">
          <div className="nameandfeedback">
            <NameDate name={user?.name} date={date} />
            {decodedToken?.id !== id && (
              <>
                {/* <button
                  className="feedbackbutton"
                  onClick={() => handleFeedbackShow(true)}
                >
                  Leave a feedback
                </button> */}
                {/* <button className="feedbackbutton" onClick={handleMessage}>
                  Message
                </button> */}
              </>
            )}
            {decodedToken?.id === id && (
              <button
                className="feedbackbutton"
                onClick={() => navigate(`/edit/${decodedToken?.id}`)}
              >
                Edit Profile
              </button>
            )}
          </div>
          <ProfileFeed user={user} />
        </div>
        <div className="right">
          <HomeRight user={user} />
        </div>
      </div>
    </div>
  );
};
export default Profile;
