import "./profileFeed.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Posts from "../Posts/Posts";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import FeedbackCard from "../FeedbackCard/FeedbackCard";

const ProfileFeed = ({ user }) => {
  const { id } = useParams();

  // states
  const [showPosts, setShowPosts] = useState(true);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [showProjectAccomplishments, setShowProjectAccomplishments] =
    useState(false);
  const [posts, setPosts] = useState();
  const [feedbacks, setFeedbacks] = useState();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/post/getpost/${id}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    setFeedbacks(user?.feedbacksRecieved);
    getPosts();
  }, []);

  const handleShowPosts = () => {
    setShowPosts(true);
    setShowFeedbacks(false);
    setShowProjectAccomplishments(false);
  };

  const handleShowFeedbacks = () => {
    setShowFeedbacks(true);
    setShowPosts(false);
    setShowProjectAccomplishments(false);
  };

  const handleShowProjectAccomplishments = () => {
    setShowPosts(false);
    setShowFeedbacks(false);
    setShowProjectAccomplishments(true);
  };

  return (
    <div className="profile">
      <ProfileHeader user={user} pageName={"profile"} />

      <div className="feed">
        <div className="achievements">
          <h2>Achieviements</h2>
          <div className="achievements-container">
            <div className="placeholder"></div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
          </div>
        </div>

        <div className="posts">
          <div className="postTitle">
            <h3
              className={showPosts ? "selected" : ""}
              onClick={handleShowPosts}
            >
              Posts
            </h3>
            <h3
              className={showFeedbacks ? "selected" : ""}
              onClick={handleShowFeedbacks}
            >
              Feedbacks
            </h3>
            <h3
              className={showProjectAccomplishments ? "selected" : ""}
              onClick={handleShowProjectAccomplishments}
            >
              Project Accomplishments
            </h3>
          </div>
          {showPosts && <Posts posts={posts} />}
          <div className="feedbacksContainer">
            {showFeedbacks &&
              feedbacks?.map((feedback, index) => (
                <FeedbackCard key={index} feedback={feedback} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFeed;
