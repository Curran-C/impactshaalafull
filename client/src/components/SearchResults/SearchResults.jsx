import { useNavigate } from "react-router-dom";
import "./searchResults.scss";

const SearchResults = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="searchResults">
      <div
        onClick={() => navigate(`/profile/${user?._id}`)}
        className="searchResult"
      >
        <img src={user.pfp} alt="" />
        <h4>{user.name}</h4>
      </div>
    </div>
  );
};

export default SearchResults;
