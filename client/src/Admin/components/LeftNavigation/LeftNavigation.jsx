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

const LeftNavigation = ({ page }) => {
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
      <Links
        highlighted={page === "subscriptions" ? true : false}
        img={subscription}
        linkText={"Subscriptions"}
        navLink={"subsciptions"}
      />
      <Links
        highlighted={page === "complaints" ? true : false}
        img={complaints}
        linkText={"Complaints"}
        navLink={"complaints"}
      />
    </div>
  );
};

export default LeftNavigation;
