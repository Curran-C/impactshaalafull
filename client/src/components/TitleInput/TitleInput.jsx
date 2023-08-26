import "./titleInput.scss";

const TitleInput = ({ title, text, onChange }) => {
  return (
    <div className="titleInput">
      <h3>{title}</h3>
      <input
        type="text"
        name=""
        id=""
        value={text}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default TitleInput;
