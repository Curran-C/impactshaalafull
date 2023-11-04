import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { location } from "../../../assets/profile";
import {
  AdminSearch,
  CancelCollab,
  LeftNavigation,
  Stat,
} from "../../components";
import "./userActivityDetails.scss";
import axiosInstance from "../../../utils/service";
import { Spin } from 'antd';

const UserActivityDetails = ({ buttonText, page }) => {
  const [showNotificatonDialog, setShowNotificatonDialog] = useState(false);
  const [showRemoveAccountDialog, setShowRemoveAccountDialog] = useState(false);
  const [userStats, setUserStats] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const location = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userId = location.state?.userId || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const getUserDetails = async () => {
        try {
          const res = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${userId}`
          );
          setUserDetails(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUserDetails();

      const getUserStats = async () => {
        try {
          const res = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/stats/${userId}`
          );
          setUserStats(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUserStats();
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [userId]);

  return (
    <div className="userActivityDetails">
      {showNotificatonDialog && (
        <CancelCollab
          onCancel={setShowNotificatonDialog}
          title={"Notification Text"}
          button={"Send Notification"}
          userId={userId}
        />
      )}

      {showRemoveAccountDialog && (
        <CancelCollab
          onCancel={setShowRemoveAccountDialog}
          title={"Reason"}
          button={"Remove account"}
          userId={userId}
        />
      )}

      <AdminSearch />
      <div className="userDetailsContainer">
        <img
          src={userDetails.pfp || "https://picsum.photos/200"}
          alt=""
          className="pfp"
        />
        <h1>{userDetails.companyName}</h1>
        <div className="sidebyside">
          <p>{userDetails.stakeholder}</p>
          <div className="location">
            <img src={location} alt="" />
            <span>
              {userDetails.city}, {userDetails.state}
            </span>
          </div>
        </div>
        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
        <a href="#" className="website">
          {userDetails.email}
        </a>
        <div className="tags">
          <p>tag</p>
          <p>tag</p>
          <p>tag</p>
          <p>tag</p>
        </div>
        <p className="text">{userDetails.description}</p>
        <div className="stats">
          <Stat count={userStats.userScore} title={"Score"} />
          <Stat count={userStats.collabs} title={"Collaborations"} />
          <Stat count={userStats.posts} title={"Posts"} />
        </div>

        <div className="buttons">
          {page === "details" && (
            <button
              className="white"
              onClick={() => setShowRemoveAccountDialog(true)}
            >
              Remove Account
            </button>
          )}
          <button onClick={() => setShowNotificatonDialog(true)}>
            {buttonText}
          </button>
        </div>
      </div>
      <Spin spinning={loading} fullscreen />
    </div>
  );
};

export default UserActivityDetails;
