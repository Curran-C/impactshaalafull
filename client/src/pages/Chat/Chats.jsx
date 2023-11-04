import { useNavigate, useOutletContext } from "react-router-dom";
import { search } from "../../assets/home";
import { chat } from "../../assets/profile";

import ChatSingle from "../../components/ChatSingle/ChatSingle";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import { Spin } from 'antd';

import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/service";
import { io } from "socket.io-client";

import "./chats.scss";
import ChatFiller from "../../components/ChatFiller/ChatFiller";
import { getAllChatsAPI, startNewChatAPI } from "../../api/chat";
import SearchResults from "../../components/SearchResults/SearchResults";
import { searchUserAPI } from "../../api/company";

const Chats = () => {
  // const { user: loggedInUser } = useOutletContext();
  const loggedInUser = JSON.parse(localStorage.getItem("IsUser"));
  const [chats, setChats] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchResultsRef = useRef();
  const socket = useRef();
  const navigate = useNavigate();

  //SOCKET IO
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BASE_URL);
    socket.current.emit("new-user-add", loggedInUser?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.current.emit("disconnected");
      socket.current.disconnect();
    };
  }, []);

  //SEND MESSAGE TO SOCKET IO SERVER
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // RECIEVE MESSAGE FROM SOCKET SERVER
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecieveMessage(data);
    });
  }, [sendMessage]);

  const getChats = async () => {
    try {
      setLoading(true);
      const allchats = await getAllChatsAPI();
      console.log(allchats);
      setChats(allchats?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //GET CHATS
    getChats();
  }, []);

  // Backend is functional
  const startNewChat = async (userId) => {
    setLoading(true);
    try {
      await startNewChatAPI(userId);
      await getChats();
      setSearchResults(null);
    } catch (error) {
      console.log("Error starting new chat: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = async (e) => {
    const input = e.target.value?.trim();
    if (!input) return setSearchResults(null);
    try {
      const filteredUsers = await searchUserAPI(input);
      setSearchResults(
        filteredUsers?.companies?.filter(
          (company) => loggedInUser?._id !== company?._id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchResults(null);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="chat">
      <div className="header">
        <button className="btn back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <div className="title">
          <img src={chat} alt="chat" />
          <h2>Chats</h2>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <div className="search" ref={searchResultsRef}>
            <img src={search} alt="search" />
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
            />
            {searchResults && (
              <SearchResults
                users={searchResults}
                short
                onClick={startNewChat}
              />
            )}
          </div>
          <div className="chatsAll">
            {chats?.length === 0 &&
              < h4 > No Chats</h4>
            }
            {chats?.map((chat) => (
              <ChatSingle
                showChat={setCurrentChat}
                key={chat._id}
                chat={chat}
                currentUserId={loggedInUser?._id}
                onlineUsers={onlineUsers}
              />
            ))}
          </div>
        </div>
        <div className="right">
          {currentChat ? (
            <ChatMessages
              chat={currentChat}
              currentUserId={loggedInUser?._id}
              setSendMessage={setSendMessage}
              recieveMessage={recieveMessage}
            />
          ) : (
            <ChatFiller />
          )}
          <Spin spinning={loading} fullscreen />
        </div>
      </div>
    </div>
  );
};

export default Chats;
