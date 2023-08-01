import "./cancelCollab.scss";

const CancelCollab = ({ onCancel, title, button }) => {
  return (
    <div className="cancelCollab">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="wrapper">
        <h1>{title}</h1>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button>{button}</button>
      </div>
    </div>
  );
};

export default CancelCollab;
