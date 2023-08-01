import "./filter.scss";

const Filter = ({ onCancel }) => {
  return (
    <div className="filterModal">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="filterContainer">
        <div className="wrapper">
          <span>Recently</span>
          <div className="times">
            <p>In this month</p>
            <p>Last month</p>
            <p>Last 3 months</p>
          </div>

          <span>Custom</span>
          <div className="times">
            <input type="date" />
            <input type="date" />
            <button>Select</button>
          </div>

          <div className="times">
            <p>Citizens</p>
            <p>NGOs</p>
            <p>Corporates</p>
            <p>Institution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
