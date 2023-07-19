import { useEffect, useState } from "react";
import { corporate, location, nopfp } from "../../assets/profile";
import Hex from "../Hex/Hex";
import ProfileLinks from "../ProfileLinks/ProfileLinks";
import Tile from "../Tile/Tile";
import "./profileFeed.scss";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import Posts from "../Posts/Posts";

const ProfileFeed = ({ user }) => {
  const { id } = useParams();

  // states
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/post/getpost/${id}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="profile">
      <div className="coverimg">
        <img src={user.coverPic} alt="" />
      </div>
      <div className="info">
        <div className="info-container">
          <div className="pfp-text">
            <img className="pfp" src={user.pfp || nopfp} alt="" />
            <div className="company-info">
              <h3>{user.companyName}</h3>
              <Tile image={corporate} type={user.stakeholder} />
              <Tile image={location} type={user.city} />
            </div>
            <div className="company-about">
              <p>{user.description}</p>
            </div>
          </div>
          <div className="stats">
            <Hex />
          </div>
        </div>
      </div>

      <div className="feed">
        <div className="achievements">
          <h2>Achieviements</h2>
          <div className="achievements-container">
            <div className="placeholder"></div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
          </div>
        </div>

        <div className="posts">
          <h2>Your Posts</h2>
          <Posts posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default ProfileFeed;
