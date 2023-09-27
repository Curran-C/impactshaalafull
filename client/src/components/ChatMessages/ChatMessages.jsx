import { useEffect, useRef, useState } from "react";
import { keyboard, link, send } from "../../assets/chats";
import axios from "axios";
import SingleMessage from "../SingleMessage/SingleMessage";

import "./chatMessages.scss";
import { format } from "timeago.js";

const ChatMessages = ({
  chat,
  currentUserId,
  setSendMessage,
  recieveMessage,
}) => {
  const [userData, setUserData] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  // SETTING RECIEVED MESSAGE
  useEffect(() => {
    if (recieveMessage !== null && recieveMessage?.chatId === chat?._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  // FETCHING DATA FOR HEADER
  useEffect(() => {
    console.log(userData);
    console.log(currentUserId);
    const getUser = async () => {
      const userId = chat?.members?.find((id) => id !== currentUserId);
      try {
        const user = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${userId}`
        );
        const loggedinuser = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/company/getuser/${currentUserId}`
        );
        setUserData(user);
        setLoggedInUser(loggedinuser);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [chat, currentUserId]);

  // FETCHING DATA THE MESSAGES
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/message/${chat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [chat]);

  // HANDLING MESSAGE SEND
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat?._id,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/message/`,
        {
          senderId: currentUserId,
          text: newMessage,
          chatId: chat?._id,
        }
      );
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }

    //SEND MESSAGE TO SOCKET SERVER
    const recieverId = chat?.members.find((id) => id !== currentUserId);
    setSendMessage({ ...message, recieverId });

    setNewMessage("");
  };

  // SCROLL TO LAST CHAT
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatMessages">
      <div className="name">
        <img src={userData?.data.pfp} alt="name" className="pfp" />
        <h2>{userData?.data.name}</h2>
      </div>
      <hr />
      <div className="chats">
        {messages?.map((message) => (
          <div
            ref={scroll}
            key={message._id}
            className={`singleChat ${
              message.senderId === currentUserId ? "chatright" : "chatleft"
            }`}
          >
            <div className="imgandtime">
              <img
                src={
                  message?.senderId === currentUserId
                    ? loggedInUser?.data.pfp
                    : userData?.data.pfp
                }
                alt=""
                className="pfpsmaller"
              />
              <p>{format(message?.createdAt)}</p>
            </div>
            <div className="messages">
              <div className="message">
                <p>{message?.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="reply">
        <div className="input">
          <div className="inputContainer">
            <img src={keyboard} alt="" className="keyboard" />
            <input
              onChange={(e) => setNewMessage(e.target.value)}
              type="text"
              name=""
              id=""
              value={newMessage}
            />
          </div>
          <img src={link} alt="attachment" />
        </div>
        <img className="send" onClick={handleSend} src={send} alt="send" />
      </div>
    </div>
  );
};

export default ChatMessages;
