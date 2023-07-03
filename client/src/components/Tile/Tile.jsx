import "./tile.scss";

const Tile = ({ image, type }) => {
  return (
    <div className="tile">
      <img className="img" src={image} alt="" />
      <span className="linkText">{type}</span>
    </div>
  );
};

export default Tile;
