import HomeMiddle from "../../components/HomeMiddle/HomeMiddle";
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
      <div className="right"></div>
    </div>
  );
};

export default Home;
