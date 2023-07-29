import "./cancelCollab.scss";

const CancelCollab = ({ onCancel }) => {
  return (
    <div className="cancelCollab">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="wrapper">
        <h1>Reason</h1>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button>Cancel Collaboration</button>
      </div>
    </div>
  );
};

export default CancelCollab;
