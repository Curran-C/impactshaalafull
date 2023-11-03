import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MiniCollabProfile from "../MiniCollabProfile/MiniCollabProfile";
import "./PostViewCard.scss";

const PostViewCard = ({ postId, status, fromId, handleApprovePost }) => {
  const navigate = useNavigate();
  const [fromUser, setFromUser] = useState({});
  const [post, setPost] = useState({});

  useEffect(() => {
    if (fromId) {
      const getFromUser = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${fromId}`
          );
          setFromUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFromUser();
      const getSinglePost = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/post/getsinglepost/${postId}`
          );
          setPost(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getSinglePost();
    }
  }, [fromId, postId]);


  return (
    <div className="postviewcard">
      <div className="wrapperTwo">
        <MiniCollabProfile
          name={fromUser?.name}
          stakeholder={fromUser?.stakeholder}
          profileImage={fromUser?.pfp}
        />
        <div className="xContainer">
          <p className="x"></p>
          <p className="status">{"-"}</p>
        </div>

        <div className="xContainer">
          <p className="x">{post.title}</p>
          <p className="status">{status}</p>
        </div>

      </div>
      <div className="buttons">
        <button
          onClick={() => navigate(`/admin/collabdetails?postId=${postId}`)}
          className="more"
        >
          View More
        </button>
        <button className="more white" onClick={() => handleApprovePost(postId)}> Approve</button>
      </div>
    </div>
  );
};

export default PostViewCard;
