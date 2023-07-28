import { LeftNavigation } from "../../components";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="adminDashboard">
      <div className="left">
        <LeftNavigation page={"dashboard"} />
      </div>
      <div className="right">
        
      </div>
    </div>
  );
};

export default Dashboard;
