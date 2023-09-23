import { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./postModal.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PostModal = ({ user, collabId, post, onCancel, page }) => {
  const { id } = useParams();
  const otherUser = id === post?.createdById ? user?._id : id;
  console.log(user._id);
  console.log(otherUser);

  const navigate = useNavigate();

  const handleChatClick = async () => {
    try {
      const findChat = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/chat/find/${id}/${otherUser}`
      );
      if (!findChat?.data) {
        try {
          const chatRes = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/chat/`,
            {
              senderId: id,
              recieverId: otherUser,
            }
          );
        } catch (err) {
          console.log(err);
        }
        console.log("chat not found");
        navigate(`/chats/${id}`);
      }
      if (findChat?.data) {
        console.log("chat found");
        navigate(`/chats/${id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async () => {
    try {
      // update current loggedin use
      const resToCurrentUserOne = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${otherUser}`,
        { $push: { collaborationIdsAccepted: collabId } }
      );
      const resToCurrentUserTwo = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${otherUser}`,
        { $pull: { collaborationIds: collabId } }
      );

      //update user who posted the collaborating
      const resToOtherUserOne = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
          post?.createdById
        }`,
        { $push: { collaborationIdsAccepted: collabId } }
      );
      const resToOtherUserTwo = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
          post?.createdById
        }`,
        { $pull: { collaborationIds: collabId } }
      );
      const updateCollabs = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/collaboration/update/${collabId}`,
        {
          completed: "ongoing"
        }
      );
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/notification/create`, {
        fromId: post?.createdById,
        toId: otherUser,
        title: "Collab Request Accepted",
        message: "Collab Request Accepted",
      });
      handleChatClick();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecline = async () => {
    try {
      // update current loggedin use
      const resToCurrentUser = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${otherUser}`,
        { $push: { collaborationIdsDeclined: collabId } }
      );
      const resToCurrentUserTwo = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${otherUser}`,
        { $pull: { collaborationIds: collabId } }
      );

      //update user who posted the collaborating
      const resToOtherUser = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
          post?.createdById
        }`,
        { $push: { collaborationIdsDeclined: collabId } }
      );
      const resToOtherUserTwo = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
          post?.createdById
        }`,
        { $pull: { collaborationIds: collabId } }
      );
      const updateCollabs = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/collaboration/update/${collabId}`,
        {
          completed: "declined"
        }
      );

      onCancel(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="postModal">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <Post post={post} />
      {page === "collabsRecieved" && (
        <div className="buttons">
          <button className="green" onClick={handleAccept}>
            Accept
          </button>
          <button className="red" onClick={handleDecline}>
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default PostModal;
