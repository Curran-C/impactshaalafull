import { useEffect, useState } from "react";
import "./feedbackForm.scss";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/service";
const FeedbackForm = ({ onCancel }) => {
  const [accessToken, setAccessToken] = useState();
  const [feedback, setFeedback] = useState("");
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("IsUser"));

  // useEffect(() => {
  //   const getCookie = () => {
  //     const cookie = document.cookie;
  //     const cookies = cookie.split("; ");
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].split("=");
  //       setAccessToken(decodeURIComponent(cookie[1]));
  //       accessToken && setDecodedToken(jwtDecode(accessToken));
  //     }
  //   };
  //   getCookie();
  // }, [accessToken]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(loggedInUser.id);
    try {
      // UPDATING THE USER WHO IS WRITNG THE FEEDBACK
      const feedbackWriter = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
          loggedInUser.id
        }`,
        {
          $push: { feedbacksGiven: { feedback, id } },
        }
      );
      console.log(feedbackWriter.data);
      location.reload();
    } catch (err) {
      console.log(err);
    }
    try {
      //UPDATING THE USER WHOM THE FEEDBACK IS WRITTEN FOR
      const feedbackReciever = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${id}`,
        {
          $push: { feedbacksRecieved: { feedback, id: loggedInUser.id } },
        }
      );
      console.log(feedbackReciever.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="feedbackForm">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="feedbackFormContainer">
        <form
          onSubmit={handleFormSubmit}
          action=""
          className="feedbackFormWrapper"
        >
          <h1>Feedback</h1>
          <textarea
            onChange={(e) => setFeedback(e.target.value)}
            name=""
            required
            placeholder="Write your feedback here..."
            id=""
            cols="50"
            rows="10"
          ></textarea>
          <div className="buttons">
            <button
              onClick={() => onCancel(false)}
              type="button"
              className="cancel"
            >
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
