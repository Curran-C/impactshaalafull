import "./stat.scss";

const Stat = ({ img, count, title }) => {
  return (
    <div className="statContainer">
      {img && <img src={img} alt="" />}
      <h4>{count}</h4>
      <p>{title}</p>
    </div>
  );
};

export default Stat;
