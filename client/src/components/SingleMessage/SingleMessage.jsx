import "./singleMessage.scss";
import { format } from "timeago.js";

const SingleMessage = ({ pfp, time, text, who }) => {
  return (
    <div className={`singleChat ${who}`}>
      <div className="imgandtime">
        <img src={pfp} alt="" className="pfpsmaller" />
        <p>{format(time)}</p>
      </div>
      <div className="messages">
        <div className="message">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
