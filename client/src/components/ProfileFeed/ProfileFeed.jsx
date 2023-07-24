import "./profileFeed.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Posts from "../Posts/Posts";
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
