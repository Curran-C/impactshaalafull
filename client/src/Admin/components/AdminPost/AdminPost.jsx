import {
  NGOs,
  citizens,
  corporates,
  institutes,
} from "../../pages/adminDashboard";
import Tile from "../../../components/Tile/Tile";
import "./adminPost.scss";

const AdminPost = ({ onCancel }) => {
  return (
    <div className="adminPost">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="container">
        <form className="wrapper">
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing</h1>
          <div className="inputs">
            <input
              placeholder="EX : Lorem ipsum dolor sit amet consectetur"
              type="text"
              name=""
              id=""
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="EX : Lorem ipsum dolor sit amet consectetur"
            />
          </div>
          <div className="stakeholders">
            <Tile image={corporates} type={"Corporate"} />
            <Tile image={NGOs} type={"NGOs"} />
            <Tile image={institutes} type={"Institutes"} />
            <Tile image={citizens} type={"Citizens"} />
          </div>
          <div className="options">
            <div>
              <label htmlFor="notify">Notify</label>
              <input type="checkbox" id="notify" />
            </div>
            <div>
              <label htmlFor="post">Post</label>
              <input type="checkbox" id="post" />
            </div>
          </div>
          <div className="buttons">
            <button type="submit">Send</button>
            <button className="cancel" onClick={() => onCancel(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPost;
