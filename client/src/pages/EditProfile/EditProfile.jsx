import "./editProfile.scss";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import axios from "axios";
import { useEffect, useState } from "react";
import NameDate from "../../components/NameDate/NameDate";
import { date } from "../../utils/date";
import { useParams } from "react-router-dom";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import HomeRight from "../../components/HomeRight/HomeRight";
import TitleInput from "../../components/TitleInput/TitleInput";

const EditProfile = () => {
  const [user, setUser] = useState();
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
    <div className="editProfile">
      <div className="left">
        <ProfileLeft />
      </div>
      <div className="middle">
        <NameDate name={user?.name} date={date} />
        <ProfileHeader user={user} pageName={"editProfile"} />
        <form action="" className="edits">
          <TitleInput title={"Title"} text={"Text"} />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
