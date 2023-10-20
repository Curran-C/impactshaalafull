import { useNavigate } from "react-router-dom";
import "./searchResults.scss";
import Tile from "../Tile/Tile";
import { corporate, nopfp } from "../../assets/profile";
import Tags from "../Tags/Tags";

const SearchResults = ({ users, short, onClick }) => {
  const navigate = useNavigate();

  return (
    <div className="searchResults">
      {users?.length ? (
        users?.map((user) => (
          <div
            onClick={() =>
              onClick ? onClick(user?._id) : navigate(`/profile/${user?._id}`)
            }
            className="searchResult"
            key={user?._id}
          >
            <img src={user?.pfp || nopfp} alt="" />
            <div className="info">
              <div className="searchAbout">
                <h4>{user?.name}</h4>
                <Tile image={corporate} type={user?.stakeholder} />
              </div>
              {!short && <Tags tags={user?.tags} />}
            </div>
          </div>
        ))
      ) : (
        <span className="no-results">No results found</span>
      )}
    </div>
  );
};

export default SearchResults;
