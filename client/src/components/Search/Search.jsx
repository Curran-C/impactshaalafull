import "./search.scss";

import { bell, chat, enter, search } from "../../assets/home";
import { date } from "../../utils/date";
import NameDate from "../NameDate/NameDate";
import { useState } from "react";
import axios from "axios";
import SearchResults from "../SearchResults/SearchResults";

const Search = ({ userName }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState();

  const handleSearch = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/company/getuserfromname`,
        {
          name: search,
        }
      );
      setSearchResult(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search">
      <div className="title">
        <NameDate name={userName} date={date} />
        <div className="icons"></div>
        <div className="imgs">
          <img src={bell} alt="notifications" />
          <img src={chat} alt="chat" />
        </div>
      </div>
      <div className="inputContainer">
        <div className="input">
          <img src={search} alt="" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="search"
          />
        </div>
        <img onClick={handleSearch} src={enter} alt="" />
      </div>
      {searchResult?.data.map((user) => (
        <SearchResults user={user} key={user._id} />
      ))}
    </div>
  );
};

export default Search;
