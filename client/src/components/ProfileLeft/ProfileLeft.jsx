import { useState } from "react";

import "./profileLeft.scss";

import ProfileLinks from "../ProfileLinks/ProfileLinks";
import CreatePost from "../CreatePost/CreatePost";

import {
  chat,
  feedback,
  home,
  profileIcon,
  savedposts,
  settings,
} from "../../assets/profile";
import { useSelector } from "react-redux";

const ProfileLeft = ({ ...props }) => {
  const authUser = useSelector((state) => state.authUser.user);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCancel = (prop) => {
    setShowCreatePost(prop);
  };

  const links = [
    { path: "/home", img: home, text: "Home" },
    {
      path: `/profile/${authUser._id}`,
      img: profileIcon,
      text: "Profile",
    },
    { path: "/chats", img: chat, text: "Chats" },
    { path: "/savedPosts", img: savedposts, text: "Saved Posts" },
    {
      path: `/collaborations`,
      img: feedback,
      text: "Collaborations",
    },
    { path: "/settings", img: settings, text: "Settings" },
  ];

  return (
    <div className="profileLeft">
      {showCreatePost && <CreatePost onCancel={handleCancel} />}
      <button
        className="createpost"
        onClick={() => handleCancel(!showCreatePost)}
      >
        Create Post +
      </button>
      {links.map((link, index) => (
        <ProfileLinks
          onClick={props?.onLinkClick}
          key={index}
          img={link.img}
          linkText={link.text}
          to={link.path}
        />
      ))}
    </div>
  );
};

export default ProfileLeft;
