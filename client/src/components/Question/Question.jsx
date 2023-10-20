import "./questions.scss";

const Question = ({ question, description }) => {
  return (
    <div className={`questionContainer`}>
      <div className="questionWrapper">
        <h3>{question}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Question;
