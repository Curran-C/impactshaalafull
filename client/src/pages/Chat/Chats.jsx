import { useParams } from "react-router-dom";
import { search } from "../../assets/home";
import { chat } from "../../assets/profile";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import ChatsAll from "../../components/ChatsAll/ChatsAll";
import "./chats.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Chats = () => {
  const { id } = useParams();

  const [loggedInUser, setLoggedInUser] = useState();
  const [chats, setChats] = useState();

  useEffect(() => {
    //GET USER
    const getUser = async () => {
      try {
        const user = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        setLoggedInUser(user);
        console.log(loggedInUser);
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
        console.log(chats);
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
          <ChatsAll user={loggedInUser?.data} chats={chats?.data} />
        </div>
        <div className="right">
          <ChatMessages />
        </div>
      </div>
    </div>
  );
};

export default Chats;
