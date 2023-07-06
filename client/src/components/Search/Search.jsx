import "./search.scss";

import { bell, chat, enter, search } from "../../assets/home";
import { date } from "../../utils/date";
import NameDate from "../NameDate/NameDate";
import { useContext } from "react";
import { UserContext } from "../../pages/Home/Home";

const Search = () => {
  const { name } = useContext(UserContext);

  return (
    <div className="search">
      <div className="title">
        <NameDate name={name} date={date} />
        <div className="icons"></div>
        <div className="imgs">
          <img src={bell} alt="notifications" />
          <img src={chat} alt="chat" />
        </div>
      </div>
      <div className="inputContainer">
        <div className="input">
          <img src={search} alt="" />
          <input type="text" placeholder="search" />
        </div>
        <img src={enter} alt="" />
      </div>
    </div>
  );
};

export default Search;
