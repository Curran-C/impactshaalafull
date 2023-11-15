import "./posts.scss";

import Post from "../Post/Post";

const Posts = ({ posts, isSaved = false, ongoingCompletedCollabsIds }) => {
  return (
    <div className="postsContainer">
      {posts?.map((post) => (
        <Post post={post} key={post._id} ongoingCompletedCollabsIds={ongoingCompletedCollabsIds} />
      ))}
      {posts?.length === 0 && isSaved && <h4> No Saved Post.</h4>}
    </div>
  );
};

export default Posts;
