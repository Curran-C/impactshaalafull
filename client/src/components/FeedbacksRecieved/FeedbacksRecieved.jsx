import FeedbackCard from "../FeedbackCard/FeedbackCard";
import "./feedbacksRecieved.scss";

const FeedbacksRecieved = () => {
  return (
    <div className="feedbacksRecieved">
      <FeedbackCard />
      <FeedbackCard />
      <FeedbackCard />
    </div>
  );
};

export default FeedbacksRecieved;
