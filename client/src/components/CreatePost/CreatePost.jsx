import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../pages/Home/Home";
import "./createPost.scss";

const CreatePost = ({ onCancel }) => {
  //states
  const [post, setPost] = useState({});
  const userId = useContext(UserContext);

  const handleInputChange = (e) => {
    setPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCreatePost = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/create`,
        {
          ...post,
          createdById: userId,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="createPost">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="container">
        <form onSubmit={handleCreatePost} className="wrapper">
          <h1>New Post</h1>
          <div className="input">
            <h2>Title</h2>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Title"
              name="title"
            />
          </div>
          <div className="input">
            <h2>Position Name</h2>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Position Name"
              name="posName"
            />
          </div>
          <div className="input">
            <h2>Position Details</h2>
            <textarea
              onChange={handleInputChange}
              rows={10}
              placeholder="Position Details"
              type="text"
              name="posDetails"
            />
          </div>
          <div className="buttons">
            <button
              className="cancel"
              type="button"
              onClick={() => onCancel(false)}
            >
              Cancel
            </button>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
