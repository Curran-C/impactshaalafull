import { useEffect, useState } from "react";
import "./feedbackForm.scss";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import axios from "axios";

const FeedbackForm = ({ onCancel }) => {
  const [accessToken, setAccessToken] = useState();
  const [decodedToken, setDecodedToken] = useState();
  const [feedback, setFeedback] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getCookie = () => {
      const cookie = document.cookie;
      const cookies = cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        setAccessToken(decodeURIComponent(cookie[1]));
        accessToken && setDecodedToken(jwtDecode(accessToken));
      }
    };
    getCookie();
  }, [accessToken]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(decodedToken.id);
    try {
      // UPDATING THE USER WHO IS WRITNG THE FEEDBACK
      const feedbackWriter = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${
          decodedToken.id
        }`,
        {
          $push: { feedbacksGiven: { feedback, id } },
        }
      );
      console.log(feedbackWriter.data);
    } catch (err) {
      console.log(err);
    }
    try {
      //UPDATING THE USER WHOM THE FEEDBACK IS WRITTEN FOR
      const feedbackReciever = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/updateuser/${id}`,
        {
          $push: { feedbacksRecieved: { feedback, id: decodedToken.id } },
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
