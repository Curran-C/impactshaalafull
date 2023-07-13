import { useEffect } from "react";
import ChatSingle from "../ChatSingle/ChatSingle";
import axios from "axios";
import "./chatsAll.scss";
import { useParams } from "react-router-dom";

const ChatsAll = ({ user, chats }) => {
  return (
    <div className="chatsAll">
      {console.log(user)}
      {chats?.map((chat) => (
        <ChatSingle key={chat._id} chat={chat} currentUserId={user?._id} />
      ))}
    </div>
  );
};

export default ChatsAll;
