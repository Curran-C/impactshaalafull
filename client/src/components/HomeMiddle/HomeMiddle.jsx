import "./homeMiddle.scss";

import Search from "../Search/Search";
import Posts from "../Posts/Posts";
import Collab from "../Collab/Collab";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllPostsAPI } from "../../api/post";
import { Spin } from "antd";

const HomeMiddle = () => {
  const [posts, setPosts] = useState([]);
  const { user, setPageLoading } = useOutletContext();

  const fetchPosts = async () => {
    try {
      setPageLoading(true);
      const data = await getAllPostsAPI();
      setPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="homeMiddle">
      {/* <Search userName={user?.name} /> */}
      <h2 className="title">Recent Posts</h2>
      <Posts posts={posts} />
      <Collab />
    </div>
  );
};

export default HomeMiddle;
