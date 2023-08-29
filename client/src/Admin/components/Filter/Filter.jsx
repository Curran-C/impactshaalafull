import "./filter.scss";
import { useState } from "react";

const Filter = ({ onCancel, onFilterChange }) => {
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
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      dateFilter: value,
    }));
  };

  const handleStakeHolderFilterClick = (value) => {
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
            <p onClick={() => handleTimeFilterClick("thisMonth")}>In this month</p>
            <p onClick={() => handleTimeFilterClick("lastMonth")}>Last month</p>
            <p onClick={() => handleTimeFilterClick("lastThreeMonths")}>Last 3 months</p>
          </div>

          <span>Custom</span>
          <div className="times">
            <input type="date" name="from" onChange={handleDateFilterChange}/>
            <input type="date" name="to" onChange={handleDateFilterChange}/>
           
          </div>

          <div className="times">
            <p onClick={() => handleStakeHolderFilterClick("Working Professional")}>Professional</p>
            <p onClick={() => handleStakeHolderFilterClick("NGO")}>NGOs</p>
            <p onClick={() => handleStakeHolderFilterClick("Corporate")}>Corporates</p>
            <p onClick={() => handleStakeHolderFilterClick("Educational Institution")}>Institution</p>
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
