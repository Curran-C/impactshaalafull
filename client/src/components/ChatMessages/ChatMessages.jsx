import { keyboard, link, send } from "../../assets/chats";
import LeftChat from "../LeftChat/LeftChat";
import RightChat from "../RightChat/RightChat";
import "./chatMessages.scss";

const ChatMessages = () => {
  return (
    <div className="chatMessages">
      <div className="name">
        <img src="https://picsum.photos/200" alt="name" className="pfp" />
        <h2>Name</h2>
      </div>
      <hr />
      <div className="chats">
        <LeftChat />
        <RightChat />
        <LeftChat />
        <LeftChat />
        <RightChat />
        <RightChat />
      </div>

      <div className="reply">
        <div className="input">
          <div className="inputContainer">
            <img src={keyboard} alt="" className="keyboard" />
            <input type="text" name="" id="" />
          </div>
          <img src={link} alt="attachment" />
        </div>
        <img className="send" src={send} alt="send" />
      </div>
    </div>
  );
};

export default ChatMessages;
