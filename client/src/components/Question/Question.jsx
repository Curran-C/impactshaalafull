import "./questions.scss";

const Question = ({ question, position }) => {
  return (
    <div className={`questionContainer ${position}`}>
      <div className="questionWrapper">
        <h3>{question}</h3>
        <p></p>
      </div>
    </div>
  );
};

export default Question;
