import "./savedPosts.scss";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import Search from "../../components/Search/Search";
import HomeRight from "../../components/HomeRight/HomeRight";
import Posts from "../../components/Posts/Posts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SavedPosts = () => {
  // CONSTANTS
  const { id } = useParams();

  // STATES
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const getSavedPosts = async () => {
      try {
        // GET USER
        const user = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        setUser(user.data);
        // LOOP THROUGH USERS SAVED POSTS AND PUSH THEM TO POSTS STATE
        user.data.bookmarkedPosts.map(async (bookmarkedPost) => {
          try {
            const post = await axios.get(
              `${
                import.meta.env.VITE_BASE_URL
              }/api/post/getsavedposts/${bookmarkedPost}`
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
      {console.log(user)}
      <div className="left">
        <ProfileLeft page={"savedPosts"} />
      </div>
      <div className="center">
        {user && <Search userName={user?.name} />}
        <h1>Saved Posts</h1>
        <Posts posts={posts} />
      </div>
      <div className="right">{user && <HomeRight user={user} />}</div>
    </div>
  );
};

export default SavedPosts;
