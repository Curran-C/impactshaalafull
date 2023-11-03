import { useState, useEffect } from "react";
import axios from "axios";
import "./createPost.scss";
import { calender, clock, location } from "../../assets/createpost";
import { useOutletContext } from "react-router-dom";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";

const CreatePost = ({ onCancel }) => {
  const date = new Date();
  const { user } = useOutletContext();
  const id = user._id;
  const userDetails = user;

  //states
  const [post, setPost] = useState({
    fromDate: date.toISOString().slice(0, 10),
    toDate: date.toISOString().slice(0, 10),
    time: date.toTimeString().slice(0, 5),
    tenure: "Micro Projects: (1 to 3 days)",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleInputChange = (e) => {
    setPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  const handleCreatePost = async (e) => {
    e.preventDefault();
    console.log(post);
    let updatedPost = post;
    if (updatedPost?.keywords) {
      updatedPost.keywords = updatedPost?.keywords.split(" ");
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/create`,
        {
          ...post,
          createdById: id,
          location: userDetails.city,
          isAdmin: false,
        }
      );
      toast.success("Your post request has been submitted. An admin will review and accept it soon.");
      console.log(res.data);
      onCancel(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setSelectedFiles(files);
  };

  return (
    <Modal>
      <h3 className="modal-title">Create a post</h3>
      <form onSubmit={handleCreatePost} className="create-post modal-body">
        <div className="inputs">
          <div className="input">
            <h4>Keywords</h4>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Seperate using space"
              name="keywords"
              value={post.keywords}
              required
            />
          </div>
          <div className="input">
            <h4>Collaborate with</h4>
            <select
              required
              name="collaborateWith"
              onChange={handleInputChange}
              id="collaborateWith"
              value={post.collaborateWith}
            >
              {user?.stakeholder !== "Educational Institutions" ? (
                <>
                  <option value="" hidden selected disabled>
                    Who do you want to collaborate with ?
                  </option>
                  <option value="Educational Institutions">
                    Educational Institutions
                  </option>
                  <option value="Corporates">Corporates</option>
                  <option value="NGOs">NGOs</option>
                  <option value="Working Professionals">
                    Working Professionals
                  </option>
                </>
              ) : (
                <option value="Educational Institutions">
                  Educational Institutions
                </option>
              )}
            </select>
          </div>
          <div className="input">
            <h4>Title</h4>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="A consice title for the project"
              name="title"
              required
              value={post.title || ""}
            />
          </div>
          <div className="input">
            <h4>Objective</h4>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="A clear Objective of the project"
              name="objective"
              value={post.objective || ""}
              required
            />
          </div>

          <div className="input">
            <h4>Project Description</h4>
            <textarea
              onChange={handleInputChange}
              rows={3}
              placeholder="Give a short description"
              type="text"
              name="description"
              value={post.description || ""}
              required
            />
          </div>

          <div className="input">
            <h4>Beneficiaries and Gains</h4>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Who are the beneficiaries and what will they gain?"
              name="beneficiaries"
              value={post.beneficiaries || ""}
              required
            />
          </div>

          <div className="input">
            <h4>Resource Needed</h4>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="What are the resources needed ? Eg: Skills / Expertise / Material Support"
              required
              name="resources"
              value={post.resources || ""}
            />
          </div>

          <div className="small-details">
            <div className="input">
              <h4>Project Tenure</h4>
              <div className="input">
                <img src={calender} alt="" />
                <select
                  onChange={handleInputChange}
                  name="tenure"
                  id="tenure"
                  required
                  value={post?.tenure || ""}
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
            <div className="input">
              <h4>Time</h4>
              <div className="input">
                <img src={clock} alt="" />
                <input
                  type="time"
                  required
                  name="time"
                  id="time"
                  onChange={handleInputChange}
                  value={post.time || ""}
                />
              </div>
            </div>

            <div className="input">
              <h4>From</h4>
              <div className="input">
                <img src={calender} alt="" />
                <input
                  onChange={handleInputChange}
                  type="date"
                  name="fromDate" // Make sure the name is "fromDate"
                  required
                  id="from_date"
                  value={post.fromDate || ""}
                />
              </div>
            </div>

            <div className="input">
              <h4>TO</h4>
              <div className="input">
                <img src={calender} alt="" />
                <input
                  onChange={handleInputChange}
                  type="date"
                  name="toDate" // Make sure the name is "toDate"
                  required
                  id="to_date"
                  value={post.toDate || ""}
                />
              </div>
            </div>






            {/* <div className="input">
              <h4>Location</h4>
              <div className="input">
                <img src={location} alt="" />
                <input
                  type="text"
                  name="location"
                  required
                  id="location"
                  onChange={handleInputChange}
                  value={post.location || ""}
                  placeholder="On-site / Virtual location"
                />
              </div>
            </div> */}
          </div>

          <div className="input">
            <h4>Attachments</h4>
            <div className="input">
              <input
                type="file"
                accept="image/*, .pdf, .doc, .docx"
                onChange={handleFileInputChange}
                name="attachments"
                id="attachments"
                multiple
                required
              />
              {/* <label htmlFor="attachments">
              <img src={attachIcon} alt="Attach Icon" />
              Attach Files
            </label> */}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="cancel-button"
            type="button"
            onClick={() => onCancel(false)}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Post
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePost;
