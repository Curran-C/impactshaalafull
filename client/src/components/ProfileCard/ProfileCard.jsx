import { useNavigate, useParams } from "react-router-dom";
import { edit } from "../../assets/home";
import { corporate } from "../../assets/profile";
import Tile from "../Tile/Tile";
import "./profileCard.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../pages/Home/Home";

const ProfileCard = ({ user }) => {
  // states

  const navigate = useNavigate();

  return (
    <div className="profileCard">
      <div className="header">
        <h2>Profile</h2>
        <img src={edit} alt="" />
      </div>
      <div className="profileInfo">
        <img className="profilepic" src={user?.pfp} alt="" />
        <h2>{user?.name}</h2>
        <p>{user?.tagline}</p>
      </div>
      <Tile image={corporate} type={user?.stakeholder} />
      <button onClick={() => navigate(`/profile/${user?._id}`)}>
        View More
      </button>
    </div>
  );
};

export default ProfileCard;
