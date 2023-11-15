import "./titleInput.scss";

const TitleInput = ({ title, value, onChange, name }) => {
  return (
    <div className="titleInput">
      <h5>{title}</h5>
      <input
        type="text"
        name={name}
        id=""
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default TitleInput;
