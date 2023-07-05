import { chat } from "../../assets/profile";
import { faq, privacy } from "../../assets/settings";
import HomeRight from "../../components/HomeRight/HomeRight";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import Search from "../../components/Search/Search";
import "./settings.scss";

const Settings = () => {
  return (
    <div className="settings">
      <div className="left">
        <ProfileLeft page={"settings"} />
      </div>
      <div className="center">
        <Search />
        <div className="settingsContainer">
          <h1>Position name details</h1>
          <div className="settingsWrapper">
            <div className="setting">
              <img src={chat} alt="" />
              <p>Communications</p>
            </div>
            <div className="setting">
              <img src={privacy} alt="" />
              <p>Privacy</p>
            </div>
            <div className="setting">
              <img src={chat} alt="" />
              <p>Blocks</p>
            </div>
            <div className="setting">
              <img src={faq} alt="" />
              <p>FAQs</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <HomeRight />
      </div>
    </div>
  );
};

export default Settings;
