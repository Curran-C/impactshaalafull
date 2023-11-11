import { useSelector } from "react-redux";
import HomeMiddle from "../../components/HomeMiddle/HomeMiddle";
import HomeRight from "../../components/HomeRight/HomeRight";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import "./home.scss";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { setPageTitle } = useOutletContext();
  useEffect(() => {
    // setPageTitle("Home");
  }, []);

  return (
    <div className="homePage">
      <HomeMiddle />
    </div>
  );
};

export default Home;
