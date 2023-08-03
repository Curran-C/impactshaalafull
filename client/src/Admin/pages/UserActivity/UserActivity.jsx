import { useState } from "react";
import { AdminSearch, LeftNavigation, UserInfoCard } from "../../components";
import "./userActivity.scss";

const UserActivity = () => {
  const [showUsers, setShowUsers] = useState(true);
  const [showRemovedUsers, setShowRemovedUsers] = useState(false);
  const [showInactiveUsers, setShowInactiveUsers] = useState(false);

  const setAllFalse = () => {
    setShowUsers(false);
    setShowInactiveUsers(false);
    setShowRemovedUsers(false);
  };

  const handleClick = (tab) => {
    setAllFalse();
    if (tab === "all") setShowUsers(true);
    if (tab === "remove") setShowRemovedUsers(true);
    if (tab === "inactive") setShowInactiveUsers(true);
  };

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
            <UserInfoCard />
            <UserInfoCard />
            <UserInfoCard />
            <UserInfoCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
