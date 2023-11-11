import "./savedPosts.scss";

import Posts from "../../components/Posts/Posts";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/service";
import { useSelector } from "react-redux";

const SavedPosts = () => {
  const authUser = useSelector((state) => state.authUser.user);
  const [posts, setPosts] = useState([]);
  const { setPageLoading, setPageTitle } = useOutletContext();

  useEffect(() => {
    const getSavedPosts = async () => {
      setPageLoading(true);
      try {
        authUser?.bookmarkedPosts.map(async (bookmarkedPost) => {
          try {
            const post = await axiosInstance.get(
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
      } finally {
        setPageLoading(false);
      }
    };
    getSavedPosts();

    setPageTitle("Saved Posts");
  }, []);

  return (
    <div className="saved-posts-page">
      <Posts posts={posts} isSaved={true} />
    </div>
  );
};

export default SavedPosts;
