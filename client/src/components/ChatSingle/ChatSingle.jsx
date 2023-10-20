import { useEffect, useState } from "react";
import "./chatSingle.scss";
import axios from "axios";

const ChatSingle = ({ chat, currentUserId, showChat, onlineUsers }) => {
  const [userData, setUserData] = useState(); //user to whom we send the message
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const userId = chat.members.find((id) => id !== currentUserId);
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${userId}`
        );
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const isOnline = onlineUsers?.some((user) => user.userId === userData?._id);
    setOnline(isOnline);
  }, [onlineUsers, userData]);

  return (
    <div className="chatSingle" onClick={() => showChat(chat)}>
      <img src={userData?.pfp} alt="" />
      <div className="name">
        <h4>{userData?.name}</h4>
        <p>{online ? "Online" : "Offline"}</p>
      </div>
      <div className="time">
        <p>9:20</p>
        <div className="unreadCounter">9</div>
      </div>
    </div>
  );
};

export default ChatSingle;
