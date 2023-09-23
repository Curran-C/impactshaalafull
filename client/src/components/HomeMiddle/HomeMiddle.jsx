import "./homeMiddle.scss";

import Search from "../Search/Search";
import Posts from "../Posts/Posts";
import Collab from "../Collab/Collab";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../pages/Home/Home";

const HomeMiddle = () => {
  const [posts, setPosts] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/post/getposts`,
          {
            withCredentials: true,
          }
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="homeMiddle">
      <Search userName={user?.name} />
      <h1 className="title">Recent Posts</h1>
      <Posts posts={posts} />
    </div>
  );
};

export default HomeMiddle;
