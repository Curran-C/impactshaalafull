import { useEffect, useState } from "react";
import "./chatSingle.scss";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

const ChatSingle = ({ chat, currentUserId }) => {
  const { id } = useParams();
  const [userData, setUserData] = useState(); //user to whom we send the message

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

  return (
    <div className="chatSingle">
      <img src={userData?.pfp} alt="" />
      <div className="name">
        <h4>{userData?.name}</h4>
        <p>Message...</p>
      </div>
      <div className="time">
        <p>9:20</p>
        <div className="unreadCounter">9</div>
      </div>
    </div>
  );
};

export default ChatSingle;
