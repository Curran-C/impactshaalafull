import "./chatSingle.scss";

const ChatSingle = () => {
  return (
    <div className="chatSingle">
      <img src="https://picsum.photos/200" alt="" />
      <div className="name">
        <h4>Name</h4>
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
