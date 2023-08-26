import { useState } from "react";
import "./giveScoreModal.scss";

const GiveScoreModal = ({ onCancel }) => {
  const [score, setScore] = useState(0);

  return (
    <div className="giveScore">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="container">
        <div className="wrapper">
          <h1>Stakeholder Name</h1>

          <div className="score">
            <h5 disabled onClick={() => setScore(score - 1)}>
              -
            </h5>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
            <h5 disabled onClick={() => setScore(score + 1)}>
              +
            </h5>
          </div>

          <textarea
            name=""
            id=""
            cols="80"
            rows="10"
            placeholder="Note"
          ></textarea>

          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default GiveScoreModal;
