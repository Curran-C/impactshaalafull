import "./NameDate.scss";

const NameDate = ({ name, date }) => {
  return (
    <div className="intro">
      <h2>Hello, {name}</h2>
      <p>Today is {date}</p>
    </div>
  );
};

export default NameDate;
