import "./savedPosts.scss";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import Search from "../../components/Search/Search";
import HomeRight from "../../components/HomeRight/HomeRight";
import Posts from "../../components/Posts/Posts";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SavedPosts = () => {
  const { user } = useOutletContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getSavedPosts = async () => {
      try {
        user?.bookmarkedPosts.map(async (bookmarkedPost) => {
          try {
            const post = await axios.get(
              `${
                import.meta.env.VITE_BASE_URL
              }/api/post/getsavedposts/${bookmarkedPost}`,
              { withCredentials: true }
            );
            setPosts((prev) => [...prev, post.data]);
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    getSavedPosts();
  }, []);

  return (
    <div className="savedPosts">
      <div className="left">
        <ProfileLeft page={"savedPosts"} />
      </div>
      <div className="center">
        {user && <Search userName={user?.name} />}
        <h1>Saved Posts</h1>
        <Posts posts={posts} />
      </div>
      <div className="right">
        <HomeRight />
      </div>
    </div>
  );
};

export default SavedPosts;
