import { useNavigate } from "react-router-dom";
import {
  AdminSearch,
  CancelCollab,
  LeftNavigation,
  MiniCollab,
} from "../../components";
import "./collabDetails.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import MiniCollabProfile from "../../components/MiniCollabProfile/MiniCollabProfile";
import { keyboard } from "../../../assets/chats";
import { toast } from "react-toastify";

const CollabDetails = () => {
  const navigate = useNavigate();
  const [showCancelCollab, setShowCancelCollab] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const collabId = queryParams.get("collabId");
  const postId = queryParams.get("postId");
  const [collab, setCollab] = useState([]);
  const [post, setPost] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [user, setUser] = useState({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const getCollab = async () => {
      try {
        if (postId) {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/post/getsinglepost/${postId}`
          );
          setPost(res.data);
          setFromDate(new Date(res.data.fromDate).toISOString().split("T")[0]);
          setToDate(new Date(res.data.toDate).toISOString().split("T")[0])
          const user = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${res.data.createdById
            }`
          );
          setUser(user.data);
        } else {
          const collabRequest = await axios.get(
            `${import.meta.env.VITE_BASE_URL
            }/api/collaboration/single/${collabId}`
          );
          setCollab(collabRequest.data);
          const postRequest = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/post/getsinglepost/${collabRequest.data.postId
            }`
          );
          setPost(postRequest.data);
          setStartDate(
            new Date(postRequest.data.createdAt).toISOString().split("T")[0]
          );
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${postRequest.data.createdById
            }`
          );
          setUser(res.data);
        }

      } catch (err) {
        console.log(err);
      }
    };
    getCollab();
  }, [collabId]);

  const handleApprovePost = async (postId) => {
    const confirmApprove = window.confirm("Are you sure you want to approve this post?");
    if (confirmApprove) {
      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/post/approvePost/${postId}`
        );
        toast.success("Post Approved");
        navigate("/admin/collaborations");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="collabDetails">
      {showCancelCollab && (
        <CancelCollab
          onCancel={setShowCancelCollab}
          title={"Reason"}
          button={"Cancel Collaboration"}
          collabId={collabId}
        />
      )}

      <AdminSearch />
      {postId ?
        <div className="collabDetailsContainer">
          <span>Posted by</span>
          <MiniCollabProfile
            name={user?.name}
            stakeholder={user?.stakeholder}
            profileImage={user?.pfp}
          />
          <h5>{user.companyName}</h5>
          <p className="duration">
            {fromDate} &nbsp;&nbsp; - &nbsp;&nbsp; {toDate}
          </p>
          <div className="text">
            <div className="tags">
              {post?.keywords?.map((keyword) => (
                <p key={keyboard}>{keyword}</p>
              ))}

            </div>
            <p className="actualText"><strong>Title :</strong> {post.title}</p>
            <p className="actualText"><strong>Decription :</strong>  {post.description}</p>
            <a href="">See Documentation</a>

            <div className="buttons">
              <button
                className="white"
                onClick={() => navigate("/admin/dashboard")}
              >
                Back home
              </button>
              <button onClick={() => handleApprovePost(postId)}>
                Accept Post
              </button>
            </div>
          </div>
        </div>
        :
        <div className="collabDetailsContainer">
          <MiniCollab
            status={collab?.completed}
            fromId={collab.fromId}
            toId={collab.toId}
          />
          <span>Posted by</span>
          <h5>{user.companyName}</h5>
          <p className="duration">
            {startDate} &nbsp;&nbsp; - &nbsp;&nbsp; 12-04-23
          </p>
          <div className="text">
            <div className="tags">
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
            </div>
            <p className="actualText">{post.description}</p>
            <a href="">See Documentation</a>

            <div className="buttons">
              <button
                className="white"
                onClick={() => navigate("/admin/dashboard")}
              >
                Back home
              </button>
              <button onClick={() => setShowCancelCollab(true)}>
                Cancel Collaboration
              </button>
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default CollabDetails;
