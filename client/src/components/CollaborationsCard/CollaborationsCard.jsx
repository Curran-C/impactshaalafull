import { useState } from "react";
import { corporate } from "../../assets/profile";
import Tile from "../Tile/Tile";
import "./collaborationsCard.scss";
import axiosInstance from "../../utils/service";
import PostModal from "../PostModal/PostModal";
import { useNavigate } from "react-router-dom";
import GetCreditScore from "../GetCreditScore/GetCreditScore";

const CollaborationsCard = ({ collabId, user, post, page, setIsAccepted, isAccepted }) => {
  const navigate = useNavigate();

  const [Post, setPost] = useState(null);
  const [showPost, setShowPost] = useState(false);
  const [showGetCreditScore, setShowGetCreditScore] = useState(false);

  const showCollab = async () => {
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/getsinglepost/${post}`
      );
      setPost(res);
      setShowPost(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="feedbackCard">
      {showGetCreditScore && (
        <GetCreditScore onCancel={setShowGetCreditScore} collabId={collabId} />
      )}
      <div className="feedbackprofile">
        <img className="pfp" src={user?.pfp} alt="" />
        <div className="about">
          <h4>{user?.name}</h4>
          <Tile image={corporate} type={user?.stakeholder} />
        </div>
      </div>
      <button onClick={showCollab}>View Collaboration Details</button>
      {page === "collabsAccepted" && (
        <div className="collabButtons">
          <button onClick={() => navigate(`/chats`)}>Message</button>
          <button onClick={() => setShowGetCreditScore(true)}>
            Get Credit Score
          </button>
        </div>
      )}

      {showPost && (
        <div className={"modal-overlay"}>
          <PostModal
            user={user}
            post={Post?.data}
            onCancel={setShowPost}
            page={page}
            collabId={collabId}
            setIsAccepted={setIsAccepted}
            isAccepted={isAccepted}
          />
        </div>
      )}
    </div>
  );
};

export default CollaborationsCard;
