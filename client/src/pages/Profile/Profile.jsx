import axiosInstance from "../../utils/service";
import ProfileFeed from "../../components/ProfileFeed/ProfileFeed";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import "./profile.scss";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import NameDate from "../../components/NameDate/NameDate";
import { date } from "../../utils/date";
import jwtDecode from "jwt-decode";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import HomeRight from "../../components/HomeRight/HomeRight";
import { Spin } from 'antd';

const Profile = () => {
  const { user: authUser } = useOutletContext();
  // states
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState();
  // const [decodedToken, setDecodedToken] = useState();
  const [feedbackFrom, setFeedbackFrom] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("IsUser"));
  const [loading, setLoading] = useState(false);

  // const getCookie = () => {
  //   const cookie = document.cookie;
  //   const cookies = cookie.split("; ");
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].split("=");
  //     setAccessToken(decodeURIComponent(cookie[1]));
  //     accessToken && setDecodedToken(jwtDecode(accessToken));
  //   }
  // };

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        // const res = await fetch(
        //   `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        // );
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
    // getCookie();
    // console.log(accessToken);
    getUser();
  }, [id]);

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
            <NameDate name={authUser?.name} date={date} />
            {loggedInUser?.id !== id && (
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
            {loggedInUser?.id === id && (
              <button
                className="feedbackbutton"
                onClick={() => navigate(`/profile/edit`)}
              >
                Edit Profile
              </button>
            )}
          </div>
          <Spin spinning={loading} fullscreen />
          <ProfileFeed user={user} />
        </div>
        <div className="right">
          <HomeRight />
        </div>
      </div>
    </div>
  );
};
export default Profile;
