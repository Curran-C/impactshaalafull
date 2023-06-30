import React from "react";
import "./card.scss";

const Card = (props) => {
  return (
    <div className="card">
      <img src={props.img} alt="" />
      <span className="title">{props.title}</span>
      <span className="text">{props.text}</span>
    </div>
  );
};

export default Card;
