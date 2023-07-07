import axios from "axios";
import ProfileFeed from "../../components/ProfileFeed/ProfileFeed";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./profile.scss";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import NameDate from "../../components/NameDate/NameDate";
import { date } from "../../utils/date";

// context

const Profile = () => {
  // states
  const [user, setUser] = useState({});
  const { id } = useParams();

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

  return (
    <div className="companyProfile">
      <div className="profileContainer">
        <ProfileLeft />
        <div className="right">
          <NameDate name={user.name} date={date} />
          <ProfileFeed user={user} />
        </div>
      </div>
    </div>
  );
};
export default Profile;
