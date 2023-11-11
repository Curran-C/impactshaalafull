import "./search.scss";

import { bell, chat, enter, search } from "../../assets/home";
import { date } from "../../utils/date";
import NameDate from "../NameDate/NameDate";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/service";
import SearchResults from "../SearchResults/SearchResults";
import Notifications from "../Notifications/Notifications";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsBell, BsBellFill } from "react-icons/bs";
import { PiChats } from "react-icons/pi";
import { Badge } from "antd";

const Search = ({ userName, pageTitle }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [shownotifications, setShownotifications] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const [notifCount, setNotifCount] = useState(100);
  const user = useSelector((state) => state.authUser.user);
  const [showResults, setShowResults] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await axiosInstance.get(
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
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    const getAllUsers = async () => {
      try {
        const res = await axiosInstance.get(
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
    handleSearch();
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    setSearchResults([]);
    allUsers?.map((user) => {
      if (
        user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        user?.tags.includes(search)
      )
        setSearchResults((prev) => [...prev, user]);
    });
    setShowResults(true);
  };

  return (
    <div ref={ref} className="search-container">
      <div className="title">
        <NameDate name={userName} date={date} />
        <div className="icons"></div>
        <div className="imgs">
          <div className="notification-container">
            <Badge count={notifCount} overflowCount={10}>
              {shownotifications ? (
                <BsBellFill
                  onClick={() => setShownotifications(!shownotifications)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <BsBell
                  onClick={() => setShownotifications(!shownotifications)}
                  style={{ cursor: "pointer" }}
                />
              )}
              {shownotifications && <Notifications />}
            </Badge>
            <PiChats onClick={() => navigate("/chats")} />
          </div>
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
        {showResults && (
          <SearchResults
            users={searchResults}
            onCancel={setSearchResults}
            short
          />
        )}
      </form>
      {pageTitle !== "Chats" && <h2 className="page-title">{pageTitle}</h2>}
    </div>
  );
};

export default Search;
