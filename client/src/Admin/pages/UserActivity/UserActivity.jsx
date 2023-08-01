import { AdminSearch, LeftNavigation, UserInfoCard } from "../../components";
import "./userActivity.scss";

const UserActivity = () => {
  return (
    <div className="userActivity">
      <div className="left">
        <LeftNavigation page={"useractivity"} />
      </div>
      <div className="right">
        <AdminSearch />
        <div className="titleContainer">
          <div className="titles">
            <span>All Users</span>
            <span>Removed Users</span>
            <span>Not active Users</span>
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
