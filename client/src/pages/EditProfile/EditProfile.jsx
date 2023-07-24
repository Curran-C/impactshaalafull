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
  const [updateUser, setUpdateUser] = useState({});

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
  const handleUserUpdate = () => {};
  return (
    <div className="editProfile">
      <div className="left">
        <ProfileLeft />
      </div>
      <div className="middle">
        <NameDate name={user?.name} date={date} />
        <ProfileHeader user={user} pageName={"editProfile"} />
        <form action="" className="edits">
          <TitleInput
            onChange={handleUserUpdate}
            title={user?.stakeholder}
            text={user?.companyName}
          />
          <TitleInput
            onChange={handleUserUpdate}
            title={"Tag Line"}
            text={user?.tagline}
          />
          <TitleInput
            onChange={handleUserUpdate}
            title={"Description"}
            text={user?.description}
          />
          <TitleInput
            onChange={handleUserUpdate}
            title={"Email"}
            text={user?.email}
          />
          <TitleInput
            onChange={handleUserUpdate}
            title={"Website"}
            text={user?.website}
          />
          <TitleInput
            onChange={handleUserUpdate}
            title={"Address 1"}
            text={user?.addressOne}
          />
          <TitleInput
            onChange={setUpdateUser}
            title={"Address 2"}
            text={user?.addressTwo}
          />
          <TitleInput
            onChange={setUpdateUser}
            title={"Location"}
            text={user?.city}
          />
          <button type="submit">Change</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
