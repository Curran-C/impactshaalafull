import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/service";
import { AdminSearch, LeftNavigation, UserInfoCard } from "../../components";
import "./userActivity.scss";
import { useOutletContext } from "react-router-dom";
import { Spin } from 'antd';

const UserActivity = () => {
  const [showUsers, setShowUsers] = useState(true);
  const [showRemovedUsers, setShowRemovedUsers] = useState(false);
  const [showInactiveUsers, setShowInactiveUsers] = useState(false);
  const [userStatus, setUserStatus] = useState("allusers");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);

  const setAllUsers = (user) => {
    setShowUsers(users === "allusers" ? true : false);
    setShowRemovedUsers(users === "removed" ? true : false);
    setShowInactiveUsers(users === "nonactive" ? true : false);
    setUserStatus("");
  };

  const handleClick = (tab) => {
    // setAllFalse();
    if (tab === "all") {
      setAllUsers("allusers");
      setShowUsers(true);
      setUserStatus("allusers");
    }
    if (tab === "remove") {
      setAllUsers("removed");
      setShowRemovedUsers(true);
      setUserStatus("removed");
    }
    if (tab === "inactive") {
      setAllUsers("nonactive");
      setShowInactiveUsers(true);
      setUserStatus("notactive");
    }
  };
  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL
          }/api/company/getuseractivity/${userStatus}?stakeholder=${selectedStakeholder}`
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [userStatus, selectedStakeholder]);

  const { setPageTitle } = useOutletContext();

  useEffect(() => {
    setPageTitle("useractivity");
  }, []);

  const handleStakeholderClick = (stakeholder) => {
    if (stakeholder === "See All") {
      setSelectedStakeholder("");
    } else {
      setSelectedStakeholder(stakeholder);
    }
  };

  return (
    <div className="userActivity">
      <AdminSearch />
      <div className="titleContainer">
        <div className="titles">
          <span
            className={showUsers && "highlighted"}
            onClick={() => handleClick("all")}
          >
            All Users
          </span>
          <span
            className={showRemovedUsers && "highlighted"}
            onClick={() => handleClick("remove")}
          >
            Removed Users
          </span>
          <span
            className={showInactiveUsers && "highlighted"}
            onClick={() => handleClick("inactive")}
          >
            Not active Users
          </span>
        </div>
        <div className="stakeholders">
          {["NGO", "Corporate", "Working Professional", "Educational Institution", "See All"].map((stakeholder) => (
            <p
              key={stakeholder}
              onClick={() => handleStakeholderClick(stakeholder)}
              className={selectedStakeholder === stakeholder ? "highlighted" : ""}
            >
              {stakeholder}
            </p>
          ))}
        </div>


        <div className="activity">
          {users?.map((user) => (
            // eslint-disable-next-line react/jsx-key
            <UserInfoCard
              pfp={user?.pfp}
              userId={user._id}
              name={user.name}
              stakeholder={user.stakeholder}
              key={user._id}
            />
          ))}
          {users.length === 0 &&
            <h3 >No user found</h3>
          }
        </div>
      </div>
      <Spin spinning={loading} fullscreen />
    </div>
  );
};

export default UserActivity;
