import "./posts.scss";

import Post from "../Post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

const Posts = ({ posts }) => {
  return (
    <div className="postsContainer">
      {posts?.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
