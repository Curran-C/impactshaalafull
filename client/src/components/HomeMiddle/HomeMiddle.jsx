import "./homeMiddle.scss";

import Search from "../Search/Search";
import Posts from "../Posts/Posts";
import Collab from "../Collab/Collab";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllPostsAPI } from "../../api/post";

const HomeMiddle = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useOutletContext();

  const fetchPosts = async () => {
    try {
      const data = await getAllPostsAPI();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="homeMiddle">
      <Search userName={user?.name} />
      <h2 className="title">Recent Posts</h2>
      <Posts posts={posts} />
    </div>
  );
};

export default HomeMiddle;
