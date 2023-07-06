import { useEffect, useState } from "react";
import {
  backblue,
  bookmark,
  bookmarkfilled,
  chatblue,
} from "../../assets/home";

import { corporate, location } from "../../assets/profile";

import "./post.scss";
import Tile from "../Tile/Tile";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  // states
  const [bookmarked, setBookmarked] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // side effects
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${
            post.createdById
          }`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  // function
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  return (
    <div className="post">
      <div className="user">
        <div className="userAboutContainer">
          <img src={user?.pfp} alt="" className="pfp" />
          <div className="userAbout">
            <h2>{user?.name}</h2>
            <div className="tilesContainer">
              <Tile image={corporate} type={user?.stakeholder} />
              <Tile image={location} type={user?.city} />
            </div>
          </div>
        </div>
        <img
          src={bookmarked ? bookmark : bookmarkfilled}
          alt=""
          onClick={handleBookmark}
          className="bookmark"
        />
      </div>
      <div className="container">
        <p>{post.posDetails}</p>
        <div className="containerFooter">
          <p>3 Hours ago</p>
          <div className="links">
            <img
              src={chatblue}
              alt=""
              onClick={() => navigate(`/chats/${post.createdById}`)}
            />
            <img
              src={backblue}
              alt=""
              onClick={() => navigate(`/profile/${post.createdById}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
