import Cookies from "js-cookie";
import { logo } from "../../../assets";
import {
  collabs,
  complaints,
  home,
  requests,
  subscription,
  userActivity,
} from "../../pages/adminDashboard";
import Links from "../Links/Links";
import "./leftNavigation.scss";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal/Modal";
import { useState } from "react";

const LeftNavigation = ({ page }) => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("IsAdmin");
    Cookies.remove("accessToken");
    navigate("/admin");
  };

  return (
    <div className="leftNav">
      <img className="logo" src={logo} alt="" />
      <Links
        highlighted={page === "dashboard" ? true : false}
        img={home}
        linkText={"Dashboard"}
        navLink={"dashboard"}
      />
      {/* <Links
        highlighted={page === "requests" ? true : false}
        img={requests}
        linkText={"Requests"}
        navLink={"requests"}
      /> */}
      <Links
        highlighted={page === "collaborations" ? true : false}
        img={collabs}
        linkText={"Collaborations"}
        navLink={"collaborations"}
      />
      <Links
        highlighted={page === "useractivity" ? true : false}
        img={userActivity}
        linkText={"User Activity"}
        navLink={"useractivity"}
      />
      {/* <Links
        highlighted={page === "subscriptions" ? true : false}
        img={subscription}
        linkText={"Subscriptions"}
        navLink={"subsciptions"}
      /> */}
      <Links
        highlighted={page === "givescore" ? true : false}
        img={subscription}
        linkText={"Score"}
        navLink={"givescore"}
      />
      <Links
        highlighted={page === "complaints" ? true : false}
        img={complaints}
        linkText={"Feedback"}
        navLink={"feedback"}
      />
      <button className="btn btn-light" onClick={() => setShowModal(true)}>
        Log out
      </button>
      {showModal && (
        <Modal>
          <h3>Are you sure you want to log out?</h3>
          <div className="modal-footer">
            <button
              className="submit-button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="cancel-button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LeftNavigation;
