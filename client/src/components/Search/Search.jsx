import "./search.scss";

import { bell, chat, enter, search } from "../../assets/home";
import { date } from "../../utils/date";
import NameDate from "../NameDate/NameDate";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SearchResults from "../SearchResults/SearchResults";

const Search = ({ userName }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allUsers, setAllUsers] = useState();

  const ref = useRef();

  useEffect(() => {
    // check if clicked outside
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearchResults([]);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    const getAllUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getallusers`
        );
        setAllUsers(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, [setSearchResults]);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    setSearchResults([]);
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    setSearchResults([]);
    allUsers?.map((user) => {
      if (
        user?.name.toLowerCase().includes(search.toLowerCase()) ||
        user?.tags.includes(search)
      )
        setSearchResults((prev) => [...prev, user]);
    });
  };

  return (
    <div ref={ref} className="search">
      <div className="title">
        <NameDate name={userName} date={date} />
        <div className="icons"></div>
        <div className="imgs">
          <img src={bell} alt="notifications" />
          <img src={chat} alt="chat" />
        </div>
      </div>
      <form onSubmit={handleSearch} className="inputContainer">
        <div className="input">
          <img src={search} alt="" />
          <input
            onChange={handleSearchInput}
            type="text"
            placeholder="search"
            value={search}
          />
        </div>
        <input type="submit" hidden />
        <img onClick={handleSearch} src={enter} alt="" />
      </form>
      {searchResults.length > 0 && search !== "" && (
        <SearchResults users={searchResults} onCancel={setSearchResults} />
      )}
    </div>
  );
};

export default Search;
