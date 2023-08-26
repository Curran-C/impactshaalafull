import React from "react";

import "./partnerCard.scss";

const PartnerCard = (props) => {
  return (
    <div className="partnerCard">
      <div className="cardItems">
        {props.list.map((listItem) => (
          <span key={listItem}>{listItem}</span>
        ))}
      </div>
      <div className="cardTitle">
        <span>{props.title}</span>
      </div>
    </div>
  );
};

export default PartnerCard;
