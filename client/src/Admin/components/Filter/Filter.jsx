import "./filter.scss";
import { useState } from "react";

const Filter = ({ onCancel, onFilterChange }) => {
  //states
  const [thisMonth, setThisMonth] = useState(false);
  const [lastMonth, setLastMonth] = useState(false);
  const [lastThreeMonth, setLastThreeMonth] = useState(false);
  const [professional, setProfessional] = useState(false);
  const [ngo, setNgo] = useState(false);
  const [corporates, setCorporates] = useState(false);
  const [institutions, setInstitutions] = useState(false);

  //functions

  const setAllMonths = (month) => {
    setLastMonth(month === "lastMonth" ? true : false);
    setThisMonth(month === "thisMonth" ? true : false);
    setLastThreeMonth(month === "lastThreeMonths" ? true : false);
  };

  const setAllCorporates = (stakeholder) => {
    setProfessional(stakeholder === "Working Professional" ? true : false);
    setNgo(stakeholder === "NGO" ? true : false);
    setCorporates(stakeholder === "Corporate" ? true : false);
    setInstitutions(stakeholder === "Educational Institution" ? true : false);
  };
  const [selectedFilters, setSelectedFilters] = useState({
    from: "",
    to: "",
    dateFilter: "",
    stakeholder: "",
  });

  const handleDateFilterChange = (event) => {
    const { name, value } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleTimeFilterClick = (value) => {
    setAllMonths(value);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      dateFilter: value,
    }));
  };

  const handleStakeHolderFilterClick = (value) => {
    setAllCorporates(value);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      stakeholder: value,
    }));
  };

  const applyFilters = () => {
    onFilterChange(selectedFilters);
    onCancel(false);
  };

  return (
    <div className="filterModal">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="filterContainer">
        <div className="wrapper">
          <span>Recently</span>
          <div className="times">
            <p
              className={thisMonth && "highlighted"}
              onClick={() => handleTimeFilterClick("thisMonth")}
            >
              In this month
            </p>
            <p
              className={lastMonth && "highlighted"}
              onClick={() => handleTimeFilterClick("lastMonth")}
            >
              Last month
            </p>
            <p
              className={lastThreeMonth && "highlighted"}
              onClick={() => handleTimeFilterClick("lastThreeMonths")}
            >
              Last 3 months
            </p>
          </div>

          <span>Custom</span>
          <div className="times">
            <input type="date" name="from" onChange={handleDateFilterChange} />
            <input type="date" name="to" onChange={handleDateFilterChange} />
          </div>

          <div className="times">
            <p
              className={professional && "highlighted"}
              onClick={() =>
                handleStakeHolderFilterClick("Working Professional")
              }
            >
              Professional
            </p>
            <p
              className={ngo && "highlighted"}
              onClick={() => handleStakeHolderFilterClick("NGO")}
            >
              NGOs
            </p>
            <p
              className={corporates && "highlighted"}
              onClick={() => handleStakeHolderFilterClick("Corporate")}
            >
              Corporates
            </p>
            <p
              className={institutions && "highlighted"}
              onClick={() =>
                handleStakeHolderFilterClick("Educational Institution")
              }
            >
              Institution
            </p>
          </div>
          <div className="times">
            <button onClick={applyFilters}>Select</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
