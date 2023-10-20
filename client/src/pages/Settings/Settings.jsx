import { chat } from "../../assets/profile";
import { faq, privacy, account } from "../../assets/settings";
import HomeRight from "../../components/HomeRight/HomeRight";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import Search from "../../components/Search/Search";
import "./settings.scss";
import { logout } from "../../assets/profile";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";

const Settings = () => {
  const [showNewModal, setShowModal] = useState(false);
  const [sideDiv,setSideDiv]=useState(false)

  const navigate = useNavigate();

  const handleLogout = async () => {
    setShowModal(true);
  };
  const handleLogoutConfirm = () => {
    setShowModal(false);
    localStorage.removeItem("IsUser");
    Cookies.remove("accessToken");
    navigate("/");
  };
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
            <div className="left_section">
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
              <div className="setting" onClick={() => setSideDiv(true)}>
                <img src={account} alt="" />
                <p>Account</p>
              </div>
              <div onClick={handleLogout} className="setting">
                <img src={logout} alt="logout" />
                <p>Logout</p>
              </div>
            </div>
            {
              sideDiv&&
              <div className="left_section">
              <div className="user_block_delete">
                <h2 className="user_title">Account settings</h2>
                <div className="deactivate_account_section">
                  <h4 className="user_deactivate_title">Deactivate account</h4>
                  <button className="deactivate_btn btn">Deactivate</button>
                </div>
                <div className="delete_account_section">
                  <h4 className="user_delete_title">Deactivate account</h4>
                  <button className="delete_btn btn">Delete</button>
                </div>
              </div>
            </div>
            }
            
          </div>
        </div>
      </div>
      <div className="right">
        <HomeRight />
      </div>
      {showNewModal && (
        <Modal>
          <div className="logout_popup">
            <h3>Are you sure you want to logout?</h3>
            {/* <p>you sure,that you want to logout</p> */}
            <div className="confirm_btn">
              <button
                className="cancel-button btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="Logout-button btn"
                onClick={handleLogoutConfirm}
              >
                Logout
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Settings;
