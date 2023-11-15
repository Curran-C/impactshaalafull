import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import TitleInput from "../../components/TitleInput/TitleInput";
import "./editProfile.scss";
import { updateUserAPI } from "../../api/company";
import { useDispatch } from "react-redux";
import { setUserAuth } from "../../store/slices/user";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user, setPageTitle } = useOutletContext();
  const [updateUser, setUpdateUser] = useState({
    companyName: user?.companyName || "",
    tagline: user?.tagline || "",
    description: user?.description || "",
    email: user?.email || "",
    website: user?.website || "",
    addressOne: user?.addressOne || "",
    addressTwo: user?.addressTwo || "",
    city: user?.city || "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updating, setUpdating] = useState(false);

  // Update page title
  useEffect(() => {
    setPageTitle("Edit Profile");
  }, []);

  const handleUserUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      setUpdating(true);
      e.preventDefault();
      const updatedUser = await updateUserAPI(user._id, updateUser);
      dispatch(setUserAuth({ user: updatedUser }));
      toast.success("Profile Updated");
      navigate("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="editProfile">
      <ProfileHeader user={user} pageName={"editProfile"} />
      <form onSubmit={handleSubmit} className="edits">
        <TitleInput
          onChange={handleUserUpdate}
          title={"Company Name"}
          value={updateUser?.companyName}
          name="companyName"
        />
        <TitleInput
          onChange={handleUserUpdate}
          title={"Tag Line"}
          value={updateUser?.tagline}
          name="tagline"
        />
        <TitleInput
          onChange={handleUserUpdate}
          title={"Description"}
          value={updateUser?.description}
          name="description"
        />
        <TitleInput
          onChange={handleUserUpdate}
          title={"Email"}
          value={updateUser?.email}
          name="email"
        />
        <TitleInput
          onChange={handleUserUpdate}
          title={"Website"}
          value={updateUser?.website}
          name="website"
        />
        <TitleInput
          onChange={handleUserUpdate}
          title={"Address 1"}
          value={updateUser?.addressOne}
          name="addressOne"
        />
        <TitleInput
          onChange={handleUserUpdate}
          title={"Address 2"}
          value={updateUser?.addressTwo}
          name="addressTwo"
        />
        <TitleInput
          onChange={handleUserUpdate}
          title={"Location"}
          value={updateUser?.city}
          name="city"
        />
        <div className="action_buttons">
          <Link to="/profile" className="btn btn-outline-primary">
            Back
          </Link>
          <button type="submit" className="btn btn-primary" disabled={updating}>
            {updating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
