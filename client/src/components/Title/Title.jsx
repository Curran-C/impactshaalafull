import "./title.scss";

const Title = ({ text }) => {
  return (
    <div className="titleWrapper">
      <div className="line"></div>
      <span className="title">{text}</span>
    </div>
  );
};

export default Title;
