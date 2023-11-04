import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/service";
import {
  AdminSearch,
  DocumentPreview,
  LeftNavigation,
  MiniCollab,
  PostViewCard,
} from "../../components";
import "./adminCollaborations.scss";
import { useOutletContext } from "react-router-dom";
import { Spin } from 'antd';
import { toast } from "react-toastify";

const AdminCollaborations = () => {
  const [pendingState, setPendingState] = useState(true);
  const [ongoingState, setOngoingState] = useState(false);
  const [completedState, setCompletedState] = useState(false);
  const [canceledState, setCanceledState] = useState(false);
  const [collabState, setCollabState] = useState("requested");
  const [buttonText, setButtonText] = useState("Approve");
  const [collaborations, setCollaborations] = useState([]);
  const [pendingPosts, setPendingPost] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  const setStateToTrue = (state) => {
    setPendingState(state === "requested" ? true : false);
    setOngoingState(state === "ongoing" ? true : false);
    setCompletedState(state === "completed" ? true : false);
    setCanceledState(state === "declined" ? true : false);

    setButtonText("");

    if (state === "requested") {
      setCollabState("requested");
      setButtonText("Approve");
    } else if (state === "ongoing") setCollabState("ongoing");
    else if (state === "completed") {
      setCollabState("completed");
      setButtonText("Give Score");
    } else if (state === "declined") {
      setCollabState("declined");
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      const getCollab = async () => {
        try {
          const res = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL
            }/api/collaboration/getallcollab?status=${collabState}`
          );
          setCollaborations(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      const getPendingPosts = async () => {
        try {
          const res = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL
            }/api/post/getPendingPost`
          );
          setPendingPost(res.data);
        } catch (err) {
          console.log(err);
        }
      }
      if (pendingState) {
        getPendingPosts();
      } else {
        getCollab();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [collabState, pendingState, isApproved]);

  const { setPageTitle } = useOutletContext();

  useEffect(() => {
    setPageTitle("collaborations");
  }, []);

  const handleApprovePost = async (postId) => {
    const confirmApprove = window.confirm("Are you sure you want to approve this post?");
    setLoading(true);
    if (confirmApprove) {
      try {
        const res = await axiosInstance.patch(
          `${import.meta.env.VITE_BASE_URL}/api/post/approvePost/${postId}`
        );
        toast.success("Post Approved");
        setIsApproved(!isApproved);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(true);
      }
    }
  };

  return (
    <div className="adminCollaborations">
      <AdminSearch />
      <div className="tabs">
        <h1
          className={`${pendingState && "highlighted"}`}
          onClick={() => setStateToTrue("requested")}
        >
          Pending
        </h1>
        <h1
          className={`${ongoingState && "highlighted"}`}
          onClick={() => setStateToTrue("ongoing")}
        >
          Ongoing
        </h1>
        <h1
          className={`${completedState && "highlighted"}`}
          onClick={() => setStateToTrue("completed")}
        >
          Completed
        </h1>
        <h1
          className={`${canceledState && "highlighted"}`}
          onClick={() => setStateToTrue("declined")}
        >
          Canceled
        </h1>
      </div>
      <div className="collabContainer">
        {pendingState ?
          pendingPosts.map((post) => (
            <PostViewCard
              key={post._id}
              postId={post._id}
              status={post.status}
              page={"collaborations"}
              buttonText={buttonText}
              fromId={post.createdById}
              // toId={collab.toId}
              handleApprovePost={handleApprovePost}
            />
          ))
          :
          collaborations.map((collab) => (
            <MiniCollab
              key={collab._id}
              collabId={collab._id}
              status={collabState}
              page={"collaborations"}
              buttonText={buttonText}
              fromId={collab.fromId}
              toId={collab.toId}
            />
          ))
        }
        {!pendingState && collaborations.length === 0 &&
          <h3>No Collabrations</h3>
        }
        {pendingState && pendingPosts.length === 0 &&
          <h3 >No Pending post</h3>
        }
        <Spin spinning={loading} fullscreen />

      </div>
    </div>
  );
};

export default AdminCollaborations;
