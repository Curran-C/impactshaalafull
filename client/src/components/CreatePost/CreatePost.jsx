import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../pages/Home/Home";
import "./createPost.scss";
import { calender, clock, location } from "../../assets/createpost";

const CreatePost = ({ onCancel }) => {
  const date = new Date();

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
            <h2>Objective</h2>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="objective"
              name="title"
            />
          </div>
          {/* <div className="input">
            <h2>Position Name</h2>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Position Name"
              name="posName"
            />
          </div> */}

          <div className="input">
            <h2>Write a few details</h2>
            <textarea
              onChange={handleInputChange}
              rows={10}
              placeholder="Position Details"
              type="text"
              name="posDetails"
            />
          </div>
          <div className="times">
            <div className="time">
              <p>Date</p>
              <div className="img">
                <img src={calender} alt="" />
                <input
                  type="date"
                  name=""
                  id=""
                  value={date.toISOString().slice(0, 10)}
                />
                {/* <span>{date.toDateString()}</span> */}
              </div>
            </div>
            <div className="time">
              <p>Time</p>
              <div className="img">
                <img src={clock} alt="" />
                <input
                  type="time"
                  name=""
                  id=""
                  value={date.toTimeString().slice(0, 5)}
                />
                {/* <span>{date.toDateString()}</span> */}
              </div>
            </div>
            <div className="time">
              <p>Date</p>
              <div className="img">
                <img src={location} alt="" />
                <span>{"Bangalore"}</span>
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
