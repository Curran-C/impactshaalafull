import "./profileFeed.scss";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/service";
import { useParams } from "react-router-dom";
import Posts from "../Posts/Posts";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import AddProjectAccomplishmentsPopUp from "../AddProjectAccomplishmentsPopUp/AddProjectAccomplishmentsPopUp";
import AddFeedbackPopup from "../AddFeedbackPopup/AddFeedbackPopup";
import { fetchAllFeedbacksAPI, newFeedbackAPI } from "../../api/feedback";
import { toast } from "react-toastify";
import {
  fetchAccomplishmentAPI,
  newProjectAccomplishmentAPI,
} from "../../api/projectAccomplishment";

const ProfileFeed = ({ user }) => {
  const { id } = useParams();

  // states
  const [showPosts, setShowPosts] = useState(true);
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [showProjectAccomplishments, setShowProjectAccomplishments] =
    useState(false);
  const [posts, setPosts] = useState();
  const [feedbacks, setFeedbacks] = useState([]);
  const [showNewProjectAcc, setShowNewProjectAcc] = useState(false);
  const [showNewFeedback, setShowNewFeedback] = useState(false);
  const [accomplishments, setAccomplishments] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetchAllFeedbacksAPI(id);
      setFeedbacks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAccomplishments = async () => {
    try {
      const response = await fetchAccomplishmentAPI(id);
      setAccomplishments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/post/getpost/${id}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeedbacks();
    getPosts();
    fetchAccomplishments();
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

  const submitNewFeedback = async (formData) => {
    const response = await newFeedbackAPI({
      target: id,
      ...formData,
    });
    await fetchFeedbacks();
    toast.success(response.message);
  };

  const submitNewAccomplishment = async (formData) => {
    const response = await newProjectAccomplishmentAPI(formData);
    await fetchAccomplishments();
    toast.success(response.message);
  };

  return (
    <div className="profile">
      <ProfileHeader user={user} pageName={"profile"} />

      <div className="feed">
        <div className="achievements">
          <h2>Highlights</h2>
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
              Accomplishments
            </h4>
          </div>
          {showPosts && <Posts posts={posts} />}
          <div className="feedbacksContainer">
            {showFeedbacks && id !== user?._id && (
              <button
                className="btn-add-feedback"
                onClick={() => setShowNewFeedback(true)}
              >
                <h4>Add a feedback</h4>
              </button>
            )}
            {showFeedbacks && (
              <div className="feedbacks">
                {feedbacks?.length ? (
                  feedbacks.map((feedback, index) => (
                    <FeedbackCard key={index} feedback={feedback} />
                  ))
                ) : (
                  <h4>No feedbacks yet.</h4>
                )}
              </div>
            )}
            {showNewFeedback && (
              <AddFeedbackPopup
                toggleModal={setShowNewFeedback}
                onSubmit={submitNewFeedback}
              />
            )}
          </div>

          <div className="project-accomplishments">
            {showProjectAccomplishments && id === user?._id && (
              <button
                className="btn-add-project-acc"
                onClick={() => setShowNewProjectAcc(true)}
              >
                <h4>Add a Project Accomplishment</h4>
              </button>
            )}
            {showProjectAccomplishments && (
              <div className="accomplishments">
                {accomplishments?.length ? (
                  accomplishments.map((accomplishment, index) => (
                    <p
                      style={{
                        background: "lightgrey",
                        padding: "10px",
                      }}
                      key={accomplishment._id}
                    >
                      Project Name : {accomplishment?.projectName} {"  "}
                      Project Location : {accomplishment?.projectLocation}
                    </p>
                  ))
                ) : (
                  <h4>No accomplishments yet.</h4>
                )}
              </div>
            )}
            {showNewProjectAcc && (
              <AddProjectAccomplishmentsPopUp
                toggleModal={setShowNewProjectAcc}
                onSubmit={submitNewAccomplishment}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFeed;
