import { search } from "../../assets/home";
import { chat } from "../../assets/profile";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import ChatsAll from "../../components/ChatsAll/ChatsAll";
import "./chats.scss";

const Chats = () => {
  return (
    <div className="chat">
      <div className="title">
        <img src={chat} alt="chat" />
        <h2>Chats</h2>
      </div>
      <div className="container">
        <div className="left">
          <div className="search">
            <img src={search} alt="search" />
            <input type="text" placeholder="Search" />
          </div>
          <ChatsAll />
        </div>
        <div className="right">
          <ChatMessages />
        </div>
      </div>
    </div>
  );
};

export default Chats;
