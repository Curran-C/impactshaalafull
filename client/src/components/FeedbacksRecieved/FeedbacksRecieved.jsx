import { useParams } from "react-router-dom";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import "./feedbacksRecieved.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const FeedbacksRecieved = () => {
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
    <div className="feedbacksRecieved">
      {console.log(user?.feedbacksGiven)}
      {user?.feedbacksRecieved?.map((feedback, index) => (
        <FeedbackCard key={index} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedbacksRecieved;
