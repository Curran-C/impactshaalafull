import { useState } from "react";
import Preferences from "../Preferences/Preferences";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./homeRight.scss";
import ContactUs from "../ContactUs/ContactUs";
import CreatePost from "../CreatePost/CreatePost";

const HomeRight = ({ user }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <div className="homeRight">
      {showEmailForm && (
        <ContactUs email={user?.email} onCancel={setShowEmailForm} />
      )}
      <ProfileCard user={user} />
      <Preferences />
      <div className="getInTouch">
        <h4>Need help with collaborating?</h4>
        <button onClick={() => setShowEmailForm(true)}>Get in Touch</button>
      </div>
    </div>
  );
};

export default HomeRight;
