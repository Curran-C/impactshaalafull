import { useEffect, useState } from "react";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import "./feedbacksWritten.scss";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router-dom";

const FeedbacksWritten = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <div className="feedbacksWritten">
      {console.log(user?.feedbacksGiven)}
      {user?.feedbacksGiven?.map((feedback, index) => (
        <FeedbackCard key={index} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedbacksWritten;
