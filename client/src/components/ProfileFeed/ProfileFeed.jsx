import "./profileFeed.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Posts from "../Posts/Posts";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import AddProjectAccomplishmentsPopUp from "../AddProjectAccomplishmentsPopUp/AddProjectAccomplishmentsPopUp";
import Modal from "../Modal/Modal";

const ProfileFeed = ({ user }) => {
  const { id } = useParams();

  // states
  const [showPosts, setShowPosts] = useState(true);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [showProjectAccomplishments, setShowProjectAccomplishments] =
    useState(false);
  const [posts, setPosts] = useState();
  const [feedbacks, setFeedbacks] = useState();
  const [showNewProjectAcc, setShowNewProjectAcc] = useState(false);
  const [showNewFeedback, setShowNewFeedback] = useState(false);

  const handleChildValue = (value) => {
    setShowNewProjectAcc(value);
  };

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

  const AddFeedBackPopup = ({ showModal }) => {
    return <Modal>
      <form className="">

      </form>
    </Modal>;
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
            <h4
              className={showPosts ? "selected" : ""}
              onClick={handleShowPosts}
            >
              Posts
            </h4>
            <h4
              className={showFeedbacks ? "selected" : ""}
              onClick={handleShowFeedbacks}
            >
              Feedbacks
            </h4>
            <h4
              className={showProjectAccomplishments ? "selected" : ""}
              onClick={handleShowProjectAccomplishments}
            >
              Project Accomplishments
            </h4>
          </div>
          {showPosts && <Posts posts={posts} />}
          <div className="feedbacksContainer">
            {showFeedbacks && (
              <button
                className="btn-add-feedback"
                onClick={() => setShowNewFeedback(true)}
              >
                <h4>Add a feedback</h4>
              </button>
            )}
            {showFeedbacks &&
              feedbacks?.map((feedback, index) => (
                <FeedbackCard key={index} feedback={feedback} />
              ))}
            {/* {showNewFeedback && (
              <AddFeedBackPopup showModal={setShowNewFeedback} />
            )} */}
          </div>
          {showProjectAccomplishments && (
            <div className="project-accomplishments">
              <button
                className="btn-add-project-acc"
                onClick={() => setShowNewProjectAcc(true)}
              >
                <h4>Add a Project Accomplishment</h4>
              </button>
              {/* show rest of accomplishments here */}
            </div>
          )}
          {showNewProjectAcc && (
            <AddProjectAccomplishmentsPopUp onValueChange={handleChildValue} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileFeed;
