import "./profileLeft.scss";

import ProfileLinks from "../ProfileLinks/ProfileLinks";
import CreatePost from "../CreatePost/CreatePost";

import {
  chat,
  feedback,
  home,
  logout,
  profileIcon,
  savedposts,
  settings,
} from "../../assets/profile";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// functional component
const ProfileLeft = ({ page }) => {
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);

  // functions
  const handleLogout = async () => {
    localStorage.removeItem("IsUser");
    Cookies.remove("accessToken");
    navigate("/");
  };

  const handleCancel = (prop) => {
    setShowCreatePost(prop);
  };

  // return
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
        highlighted={page === "home" ? true : false}
        img={home}
        linkText={"Home"}
        to="/home"
      />
      <ProfileLinks
        highlighted={page === "profile" ? true : false}
        img={profileIcon}
        linkText={"Profile"}
      />
      <ProfileLinks
        highlighted={page === "chat" ? true : false}
        img={chat}
        linkText={"Chats"}
        to="/chats"
      />
      <ProfileLinks
        highlighted={page === "savedPosts" ? true : false}
        img={savedposts}
        linkText={"Saved Posts"}
      />
      <ProfileLinks
        highlighted={page === "collaborations" ? true : false}
        img={feedback}
        linkText={"Collaborations"}
      />
      <ProfileLinks
        highlighted={page === "settings" ? true : false}
        img={settings}
        linkText={"Settings"}
      />
      <button onClick={handleLogout} className="logout">
        <img src={logout} alt="logout" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileLeft;
