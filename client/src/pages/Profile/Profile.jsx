import axios from "axios";
import ProfileFeed from "../../components/ProfileFeed/ProfileFeed";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./profile.scss";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import NameDate from "../../components/NameDate/NameDate";
import { date } from "../../utils/date";
import jwtDecode from "jwt-decode";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";

// context

const Profile = () => {
  // UserFront.init("demo1234");

  // states
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState();
  const [decodedToken, setDecodedToken] = useState();
  const [feedbackFrom, setFeedbackFrom] = useState(false);
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
    console.log(document.cookie);
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
    getCookie();
    getUser();
  }, [accessToken]);

  const handleFeedbackShow = (props) => {
    setFeedbackFrom(props);
  };

  return (
    <div className="companyProfile">
      {feedbackFrom && <FeedbackForm onCancel={handleFeedbackShow} />}
      <div className="profileContainer">
        <ProfileLeft />
        <div className="right">
          <div className="nameandfeedback">
            <NameDate name={user.name} date={date} />
            {decodedToken?.id !== id && (
              <button
                className="feedbackbutton"
                onClick={() => handleFeedbackShow(true)}
              >
                Leave a feedback
              </button>
            )}
          </div>
          <ProfileFeed user={user} />
        </div>
      </div>
    </div>
  );
};
export default Profile;
