import { useParams } from "react-router-dom";
import { search } from "../../assets/home";
import { chat } from "../../assets/profile";

import ChatSingle from "../../components/ChatSingle/ChatSingle";
import ChatMessages from "../../components/ChatMessages/ChatMessages";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import "./chats.scss";
import ChatFiller from "../../components/ChatFiller/ChatFiller";

const Chats = () => {
  const { id } = useParams();

  const [loggedInUser, setLoggedInUser] = useState();
  const [chats, setChats] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const socket = useRef();

  //SOCKET IO
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BASE_URL);
    socket.current.emit("new-user-add", loggedInUser?.data._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [loggedInUser]);

  //SEND MESSAGE TO SOCKET IO SERVER
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // RECIEVE MESSAGE FROM SOCKET SERVER
  useEffect(() => {
    console.log("44");
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setRecieveMessage(data);
    });
  }, [sendMessage]);

  useEffect(() => {
    //GET USER
    const getUser = async () => {
      try {
        const user = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        setLoggedInUser(user);
      } catch (err) {
        console.log(err);
      }
    };

    //GET CHATS
    const getChats = async () => {
      try {
        const allchats = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/chat/${id}`
        );
        setChats(allchats);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    getChats();
  }, []);

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
          <div className="chatsAll">
            {chats?.data.map((chat) => (
              <ChatSingle
                showChat={setCurrentChat}
                key={chat._id}
                chat={chat}
                currentUserId={loggedInUser?.data._id}
              />
            ))}
          </div>
        </div>
        <div className="right">
          {currentChat ? (
            <ChatMessages
              chat={currentChat}
              currentUserId={loggedInUser?.data._id}
              setSendMessage={setSendMessage}
              recieveMessage={recieveMessage}
            />
          ) : (
            <ChatFiller />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
