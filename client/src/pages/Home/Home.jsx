import HomeMiddle from "../../components/HomeMiddle/HomeMiddle";
import HomeRight from "../../components/HomeRight/HomeRight";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import "./home.scss";

const Home = () => {
  return (
    <div className="homePage">
      <div className="left">
        <ProfileLeft page={"home"} />
      </div>
      <div className="center">
        <HomeMiddle />
      </div>
      <div className="right">
        <HomeRight />
      </div>
    </div>
  );
};

export default Home;
