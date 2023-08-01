import { useState } from "react";
import {
  NGOs,
  citizens,
  corporates,
  filter,
  institutes,
  project,
} from "../../../assets/adminDashboard";
import {
  AdminSearch,
  LeftNavigation,
  MiniCollab,
  Stat,
} from "../../components";
import "./dashboard.scss";
import Filter from "../../components/Filter/Filter";

const Dashboard = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="adminDashboard">
      {showFilter && <Filter onCancel={setShowFilter} />}
      <div className="left">
        <LeftNavigation page={"dashboard"} />
      </div>
      <div className="right">
        <AdminSearch />
        <div className="rightContainer">
          <div className="leftSide">
            <div className="stats">
              <p className="stakeholderTitle">No. of stakeholders</p>
              <div className="stakeholders">
                <Stat img={corporates} count={45} title={"Corporates"} />
                <Stat img={NGOs} count={45} title={"NGOs"} />
                <Stat img={institutes} count={45} title={"Institutes"} />
                <Stat img={citizens} count={45} title={"Citizens"} />
              </div>
            </div>

            <div className="collabContainer">
              <div className="titleForCollab">
                <h3>All Completed Collaborations</h3>
                <div onClick={() => setShowFilter(true)} className="filter">
                  <img src={filter} alt="" />
                  <p>Filter</p>
                </div>
                <p>See all</p>
              </div>
              <div className="miniCollabContainer">
                <MiniCollab page={"dashboard"} status={"In progress"} />
              </div>
            </div>
          </div>

          <div className="rightSide">
            <div className="usersContainer">
              <p className="noOfUsers">No. of users</p>
              <Stat img={citizens} count={45} title={"Total"} />
            </div>
            <div className="usersContainer">
              <p className="noOfUsers">Total Projects</p>
              <Stat img={project} count={45} title={"Total"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
