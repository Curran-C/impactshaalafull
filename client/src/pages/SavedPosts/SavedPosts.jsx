import "./savedPosts.scss";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import Search from "../../components/Search/Search";
import HomeRight from "../../components/HomeRight/HomeRight";
import Posts from "../../components/Posts/Posts";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/service";

const SavedPosts = () => {
  // const { user } = useOutletContext();
  const loggedInUser = JSON.parse(localStorage.getItem("IsUser"));

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const { setPageLoading } = useOutletContext();

  useEffect(() => {
    const getSavedPosts = async () => {
      setPageLoading(true);
      try {
        const res = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${
            loggedInUser._id
          }`
        );
        setUser(res.data);

        res.data?.bookmarkedPosts.map(async (bookmarkedPost) => {
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
  }, []);

  return (
    <div className="savedPosts">
      <div className="left">
        <ProfileLeft page={"savedPosts"} />
      </div>
      <div className="center">
        {user && <Search userName={user?.name} />}
        <h1>Saved Posts</h1>

        <Posts posts={posts} isSaved={true} />
      </div>
      <div className="right">
        <HomeRight />
      </div>
    </div>
  );
};

export default SavedPosts;
