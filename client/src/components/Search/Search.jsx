import "./search.scss";

import { bell, chat, enter, search } from "../../assets/home";
import { date } from "../../utils/date";
import NameDate from "../NameDate/NameDate";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SearchResults from "../SearchResults/SearchResults";
import Notifications from "../Notifications/Notifications";
import { useNavigate, useOutletContext } from "react-router-dom";

const Search = ({ userName }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [shownotifications, setShownotifications] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const [notifCount, setNotifCount] = useState(100);
  const { user } = useOutletContext();

  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/notification/getCount/${
            user?._id
          }`
        );
        if (response.data.count >= 100) setNotifCount("99+");
        else setNotifCount(response.data.count);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch notification count when component mounts
    fetchNotificationCount();
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
      {shownotifications && <Notifications />}
      <div className="title">
        <NameDate name={userName} date={date} />
        <div className="icons"></div>
        <div className="imgs">
          <img
            onClick={() => setShownotifications(!shownotifications)}
            src={bell}
            alt="notifications"
            style={{ cursor: "pointer" }}
          />
          <div className="notifcount">{notifCount}</div>
          <img
            onClick={() => navigate(`/chats/${user?._id}`)}
            style={{ cursor: "pointer" }}
            src={chat}
            alt="chat"
          />
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
