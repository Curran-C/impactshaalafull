import "./leftChat.scss";

const LeftChat = () => {
  return (
    <div className="leftChat">
      <div className="imgandtime">
        <img src="https://picsum.photos/200" alt="" className="pfpsmaller" />
        <p>9:10</p>
      </div>
      <div className="messages">
        <div className="message">
          <p>Hello, Lorem ipsum dolor.... </p>
        </div>
      </div>
    </div>
  );
};

export default LeftChat;
