import { useState } from "react";
import {
  backblue,
  bookmark,
  bookmarkfilled,
  chatblue,
} from "../../assets/home";

import { corporate, location } from "../../assets/profile";

import "./post.scss";
import Tile from "../Tile/Tile";

const Post = () => {
  // states
  const [bookmarked, setBookmarked] = useState(false);

  // function
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  return (
    <div className="post">
      <div className="user">
        <div className="userAboutContainer">
          <img src="https://picsum.photos/200" alt="" className="pfp" />
          <div className="userAbout">
            <h2>Name</h2>
            <div className="tilesContainer">
              <Tile image={corporate} type={"Corporate"} />
              <Tile image={location} type={"Location"} />
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu adjklkoa interdum,{" "}
        </p>
        <div className="containerFooter">
          <p>3 Hours ago</p>
          <div className="links">
            <img src={chatblue} alt="" />
            <img src={backblue} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
