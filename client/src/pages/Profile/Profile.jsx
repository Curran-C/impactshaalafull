import axios from "axios";
import ProfileFeed from "../../components/ProfileFeed/ProfileFeed";
import ProfileLinks from "../../components/ProfileLinks/ProfileLinks";
import { chat, feedback, home, logout, savedposts } from "../../assets/profile";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./profile.scss";

const Profile = () => {
  // states
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  // date
  const current = new Date();
  const month = current.toLocaleString("default", { month: "short" });
  const day = current.toLocaleString("default", { weekday: "long" });
  const date = `${day}, ${current.getDate()} ${month} ${current.getFullYear()}`;

  // functions
  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/company/logout`
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="companyProfile">
      <div className="profileContainer">
        <div className="left">
          <button className="createpost">Create Post +</button>
          <ProfileLinks img={chat} linkText={"Chat"} />
          <ProfileLinks img={home} linkText={"Home"} />
          <ProfileLinks img={savedposts} linkText={"Saved Posts"} />
          <ProfileLinks img={feedback} linkText={"Feedbacks"} />
          <button onClick={handleLogout} className="logout">
            <img src={logout} alt="" />
            <span>Logout</span>
          </button>
        </div>
        <div className="right">
          <div className="intro">
            <h1>Hello, {user.name}</h1>
            <p>Today is {date}</p>
          </div>
          <ProfileFeed user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
