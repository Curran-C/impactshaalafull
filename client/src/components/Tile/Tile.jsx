import "./tile.scss";

const Tile = ({ image, type, selected, onClicked }) => {
  return (
    <div
      style={{ cursor: "pointer" }}
      className={selected ? "highlighted tile" : "tile"}
      onClick={onClicked}
    >
      <img className="img" src={image} alt="tile" />
      <span className="linkText">{type}</span>
    </div>
  );
};

export default Tile;
