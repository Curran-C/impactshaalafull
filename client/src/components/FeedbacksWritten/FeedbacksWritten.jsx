import FeedbackCard from "../FeedbackCard/FeedbackCard";
import "./feedbacksWritten.scss";

const FeedbacksWritten = () => {
  return (
    <div className="feedbacksWritten">
      <FeedbackCard />
      <FeedbackCard />
      <FeedbackCard />
      <FeedbackCard />
    </div>
  );
};

export default FeedbacksWritten;
