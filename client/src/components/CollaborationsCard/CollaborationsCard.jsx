import { useEffect, useState } from "react";
import { corporate } from "../../assets/profile";
import Tile from "../Tile/Tile";
import "./collaborationsCard.scss";
import axios from "axios";
import PostModal from "../PostModal/PostModal";

const CollaborationsCard = ({ collabId, user, post, page }) => {
  const [Post, setPost] = useState();
  const [showPost, setShowPost] = useState(false);

  const showCollab = async () => {
    try {
      // todo get post from post Id
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/getsinglepost/${post}`
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
      <div className="feedbackprofile">
        <img className="pfp" src={user?.pfp} alt="" />
        <div className="about">
          <h4>{user?.name}</h4>
          <Tile image={corporate} type={user?.stakeholder} />
        </div>
      </div>
      {/* <div className="feedbacktext"> */}
      <button onClick={showCollab}>View Collaboration Details</button>
      {showPost && (
        <PostModal
          user={user}
          post={Post?.data}
          onCancel={setShowPost}
          page={page}
          collabId={collabId}
        />
      )}
      {/* </div> */}
    </div>
  );
};

export default CollaborationsCard;
