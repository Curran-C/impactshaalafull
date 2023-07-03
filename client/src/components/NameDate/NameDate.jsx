import React from "react";

const NameDate = ({ name, date }) => {
  return (
    <div className="intro">
      <h1>Hello, {name}</h1>
      <p>Today is {date}</p>
    </div>
  );
};

export default NameDate;
