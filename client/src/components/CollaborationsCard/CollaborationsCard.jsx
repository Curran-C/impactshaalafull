import { useEffect, useState } from "react";
import { corporate } from "../../assets/profile";
import Tile from "../Tile/Tile";
import "./collaborationsCard.scss";
import axiosInstance from "../../utils/service";
import PostModal from "../PostModal/PostModal";
import { useNavigate, useParams } from "react-router-dom";
import GetCreditScore from "../GetCreditScore/GetCreditScore";

const CollaborationsCard = ({ collabId, user, post, page }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [Post, setPost] = useState();
  const [showPost, setShowPost] = useState(false);
  const [showGetCreditScore, setShowGetCreditScore] = useState(false);

  const showCollab = async () => {
    try {
      // todo get post from post Id
      console.log(post);
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/getsinglepost/${post}`,
        { withCredentials: true }
      );
      // console.log(res);
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
      {/* <div className="feedbacktext"> */}
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
          />
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default CollaborationsCard;
