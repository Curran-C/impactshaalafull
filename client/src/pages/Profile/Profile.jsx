import axiosInstance from "../../utils/service";
import ProfileFeed from "../../components/ProfileFeed/ProfileFeed";
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import "./profile.scss";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: authUser, setPageLoading } = useOutletContext();
  const { setPageTitle } = useOutletContext();

  // states
  const [user, setUser] = useState({});
  const [feedbackFrom, setFeedbackFrom] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  let id = params?.id;
  id ??= authUser?._id;

  useEffect(() => {
    setPageTitle("Profile");
  }, []);

  useEffect(() => {
    const getUser = async () => {
      setPageLoading(true);
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
        setPageLoading(false);
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
        <div className="profileDetails">
          {/* {loggedInUser?._id !== id && (
              <>
                <button
                  className="feedbackbutton"
                  onClick={() => handleFeedbackShow(true)}
                >
                  Leave a feedback
                </button>
                <button className="feedbackbutton" onClick={handleMessage}>
                  Message
                </button>
              </>
            )} */}
          {/* {loggedInUser?._id === id && (
              <button
                className="feedbackbutton"
                onClick={() => navigate(`/profile/edit`)}
              >
                Edit Profile
              </button>
            )} */}
          <ProfileFeed user={user} />
        </div>
      </div>
    </div>
  );
};
export default Profile;
