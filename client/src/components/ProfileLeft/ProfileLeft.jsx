import "./profileLeft.scss";

import ProfileLinks from "../ProfileLinks/ProfileLinks";
import axios from "axios";
import CreatePost from "../CreatePost/CreatePost";

import { chat, feedback, home, logout, savedposts } from "../../assets/profile";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfileLeft = ({ page }) => {
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/company/logout`
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = (prop) => {
    setShowCreatePost(prop);
  };

  return (
    <div className="profileLeft">
      {showCreatePost && <CreatePost onCancel={handleCancel} />}
      <button
        className="createpost"
        onClick={() => handleCancel(!showCreatePost)}
      >
        Create Post +
      </button>
      <ProfileLinks
        highlighted={page === "chat" ? true : false}
        img={chat}
        linkText={"Chat"}
      />
      <ProfileLinks
        highlighted={page === "home" ? true : false}
        img={home}
        linkText={"Home"}
      />
      <ProfileLinks
        highlighted={page === "savedPosts" ? true : false}
        img={savedposts}
        linkText={"Saved Posts"}
      />
      <ProfileLinks
        highlighted={page === "feedback" ? true : false}
        img={feedback}
        linkText={"Feedbacks"}
      />
      <button onClick={handleLogout} className="logout">
        <img src={logout} alt="" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileLeft;
