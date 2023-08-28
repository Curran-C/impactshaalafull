import { useEffect, useState } from "react";
import axios from "axios";
import {
  NGOs,
  citizens,
  corporates,
  filter,
  institutes,
  project,
} from "../adminDashboard";
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
  const [stat, setStat] = useState();
  const [collabs, setCollab] = useState([]);
  useEffect(() => {
    const getStat = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getstats`
        );
        setStat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getStat();

    const getCollab = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/getallcollab`
        );
        setCollab(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCollab();
  }, []);
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
                <Stat
                  img={corporates}
                  count={stat?.corporates}
                  title={"Corporates"}
                />
                <Stat img={NGOs} count={stat?.ngos} title={"NGOs"} />
                <Stat
                  img={institutes}
                  count={stat?.educationalInstitutions}
                  title={"Institutes"}
                />
                <Stat
                  img={citizens}
                  count={stat?.workingProfessional}
                  title={"Citizens"}
                />
              </div>
            </div>

            <div className="collabContainer">
              <div className="titleForCollab">
                <h3>All Collaborations</h3>
                <div onClick={() => setShowFilter(true)} className="filter">
                  <img src={filter} alt="" />
                  <p>Filter</p>
                </div>
                <p>See all</p>
              </div>
              {collabs.map((collab) => (
                // eslint-disable-next-line react/jsx-key
                <div className="miniCollabContainer">
                  {/* <MiniCollab page={"dashboard"} status={"In progress"} /> */}
                  <MiniCollab
                    collabId={collab._id}
                    status={collab.completed}
                    page={"dashboard"}
                    fromId={collab.fromId}
                    toId={collab.toId}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rightSide">
            <div className="usersContainer">
              <p className="noOfUsers">No. of users</p>
              <Stat img={citizens} count={stat?.totalUsers} title={"Total"} />
            </div>
            <div className="usersContainer">
              <p className="noOfUsers">Total Projects</p>
              <Stat img={project} count={stat?.totalProjects} title={"Total"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
