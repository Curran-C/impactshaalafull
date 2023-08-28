import { useNavigate } from "react-router-dom";
import {
  AdminSearch,
  CancelCollab,
  LeftNavigation,
  MiniCollab,
} from "../../components";
import "./collabDetails.scss";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";

const CollabDetails = () => {
  const navigate = useNavigate();
  const [showCancelCollab, setShowCancelCollab] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const collabId = queryParams.get('collabId');
  const [collab, setCollab] = useState([]);
  const [post, setPost] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    const getCollab = async () => {
      try {
        const collabRequest = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/single/${collabId}`
        );
        setCollab(collabRequest.data);
        const postRequest = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/post/getsinglepost/${collabRequest.data.postId}`
        );
        setPost(postRequest.data);
        setStartDate(new Date(postRequest.data.createdAt).toISOString().split('T')[0]);
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${postRequest.data.createdById}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCollab();
  }, [collabId]);
   
  
  return (
    <div className="collabDetails">
      {showCancelCollab && (
        <CancelCollab
          onCancel={setShowCancelCollab}
          title={"Reason"}
          button={"Cancel Collaboration"}
          collabId= {collabId}
        />
      )}
      <div className="left">
        <LeftNavigation page="collaborations" />
      </div>
      <div className="right">
        <AdminSearch />
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
            <p className="actualText">
              {post.posDetails}
            </p>
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
      </div>
    </div>
  );
};

export default CollabDetails;
