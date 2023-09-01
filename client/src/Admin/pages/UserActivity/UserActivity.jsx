import { useState, useEffect } from "react";
import axios from "axios";
import { AdminSearch, LeftNavigation, UserInfoCard } from "../../components";
import "./userActivity.scss";

const UserActivity = () => {
  const [showUsers, setShowUsers] = useState(true);
  const [showRemovedUsers, setShowRemovedUsers] = useState(false);
  const [showInactiveUsers, setShowInactiveUsers] = useState(false);
  const [userStatus, setUserStatus] = useState("allusers");
  const [users, setUsers] = useState([]);
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
      // setShowUsers(true);
      setUserStatus("allusers");
    }
    if (tab === "remove") {
      setAllUsers("removed");
      // setShowRemovedUsers(true);
      setUserStatus("removed");
    }
    if (tab === "inactive") {
      setAllUsers("nonactive");
      // setShowInactiveUsers(true);
      setUserStatus("notactive");
    }
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/company/getuseractivity/${userStatus}`
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userStatus]);
  return (
    <div className="userActivity">
      <div className="left">
        <LeftNavigation page={"useractivity"} />
      </div>
      <div className="right">
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
            <p>NGOs</p>
            <p>Corporates</p>
            <p>Citizens</p>
            <p>Institutions</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
