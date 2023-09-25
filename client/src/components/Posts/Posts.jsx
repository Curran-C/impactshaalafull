import "./posts.scss";

import Post from "../Post/Post";

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
