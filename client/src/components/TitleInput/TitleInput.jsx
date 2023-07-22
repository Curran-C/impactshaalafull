import "./titleInput.scss";

const TitleInput = ({ title, text }) => {
  return (
    <div className="titleInput">
      <h3>{title}</h3>
      <input type="text" name="" id="" placeholder={text} />
    </div>
  );
};

export default TitleInput;
