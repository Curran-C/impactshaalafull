import "./savedPosts.scss";

import Posts from "../../components/Posts/Posts";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/service";
import { useDispatch, useSelector } from "react-redux";
import { getUserAPI } from "../../api/company";
import { setUserAuth } from "../../store/slices/user";
import { Spin } from "antd";

const SavedPosts = () => {
  const authUser = useSelector((state) => state.authUser.user);
  const [posts, setPosts] = useState([]);
  const { setPageLoading, setPageTitle } = useOutletContext();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getSavedPosts = async () => {
    setPageLoading(true);

    try {
      const userData = await getUserAPI(authUser._id);
      dispatch(setUserAuth({ user: userData }));

      await Promise.all(
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
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setPageLoading(false);
      setLoading(false);
    }

    setPageTitle("Saved Posts");
  };

  useEffect(() => {
    getSavedPosts();
  }, []);

  return (
    <div className="saved-posts-page">
      <Spin size="large" spinning={loading}>
        <Posts posts={posts} isSaved={true} />
      </Spin>
    </div>
  );
};

export default SavedPosts;
