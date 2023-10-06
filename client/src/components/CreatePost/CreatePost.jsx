import { useState, useEffect } from "react";
import axios from "axios";
import "./createPost.scss";
import { calender, clock, location } from "../../assets/createpost";
import { useOutletContext } from "react-router-dom";

const CreatePost = ({ onCancel }) => {
  const date = new Date();
  const { user } = useOutletContext();
  const id = user._id;
  const userDetails = user;

  //states
  const [post, setPost] = useState({
    date: date.toISOString().slice(0, 10),
    time: date.toTimeString().slice(0, 5),
  });

  const handleInputChange = (e) => {
    setPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    console.log(post);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/create`,
        {
          ...post,
          createdById: id,
          location: userDetails.city,
        }
      );
      console.log(res.data);
      onCancel(false);
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
            <h2>Objective</h2>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Objective"
              name="title"
              value={post.title || ""}
            />
          </div>

          <div className="input">
            <h2>Write a few details</h2>
            <textarea
              onChange={handleInputChange}
              rows={7}
              placeholder="Position Details"
              type="text"
              name="posDetails"
              value={post.posDetails || ""}
            />
          </div>

          <div className="times">
            <div className="time">
              <p>Timeline</p>
              <div className="img">
                <img src={calender} alt="" />
                <select
                  onChange={handleInputChange}
                  name="timeline"
                  id="timeline"
                  value={post?.timeline || ""}
                >
                  <option value="Micro Projects: (1 to 3 days)">
                    Micro Projects: (1 to 3 days)
                  </option>
                  <option value="Week-Long Projects: (4 to 7 days)">
                    Week-Long Projects: (4 to 7 days)
                  </option>
                  <option value="Month-long projects: (25 to 31 days)">
                    Month-long projects: (25 to 31 days)
                  </option>
                  <option value="Quarterly Projects: (3 months)">
                    Quarterly Projects: (3 months)
                  </option>
                  <option value="Semester Projects: (4 to 6 months)">
                    Semester Projects: (4 to 6 months)
                  </option>
                  <option value="Year-Long Projects: (12 months)">
                    Year-Long Projects: (12 months)
                  </option>
                </select>
              </div>
            </div>
            <div className="time">
              <p>Date</p>
              <div className="img">
                <img src={calender} alt="" />
                <input
                  onChange={handleInputChange}
                  type="date"
                  name="date"
                  id="date"
                  value={post.date || ""}
                />
              </div>
            </div>
            <div className="time">
              <p>Time</p>
              <div className="img">
                <img src={clock} alt="" />
                <input
                  type="time"
                  name="time"
                  id="time"
                  onChange={handleInputChange}
                  value={post.time || ""}
                />
              </div>
            </div>
            <div className="time">
              <p>Location</p>
              <div className="img">
                <img src={location} alt="" />
                <span>{userDetails.city}</span>
              </div>
            </div>
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
