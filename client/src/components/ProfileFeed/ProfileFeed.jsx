import { useEffect, useState } from "react";
import { corporate, location, nopfp } from "../../assets/profile";
import Hex from "../Hex/Hex";
import ProfileLinks from "../ProfileLinks/ProfileLinks";
import Tile from "../Tile/Tile";
import "./profileFeed.scss";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import Posts from "../Posts/Posts";
import Tags from "../Tags/tags";
import ProfileHeader from "../ProfileHeader/ProfileHeader";

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
      <ProfileHeader user={user} pageName={"profile"} />

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
