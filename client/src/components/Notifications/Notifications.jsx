import { useState } from "react";
import { corporate } from "../../assets/profile";
import Tile from "../Tile/Tile";
import "./Notifications.scss";

const Notifications = () => {
  const [highlighted, setHighlighted] = useState(true);

  //   const [notification, setNotification] = useState([])

  const handleMarkAsRead = () => {
    setHighlighted(false);
  };

  return (
    <div className="Notifications">
      {/* notifications.map((notification) => ( */}
      {/* if notification is read set highlighted to false */}
      <div className={highlighted ? "notification" : "notification seen"}>
        <div className="leftn">
          <div className="about">
            <div className="pfp">
              <img className="pic" src="https://picsum.photos/200" alt="" />
              <div className="details">
                <span>Name</span>
                <Tile image={corporate} type={"Stakeholder"} />
              </div>
            </div>
          </div>
          <div className="message">
            <p>Lorem ipsom</p>
          </div>
        </div>
        <div className="rightn">
          <p style={{ cursor: "pointer" }} onClick={handleMarkAsRead}>
            Mark as read
          </p>
        </div>
      </div>
      {/* )) */}
    </div>
  );
};

export default Notifications;
