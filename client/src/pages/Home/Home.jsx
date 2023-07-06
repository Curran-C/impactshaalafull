import { useParams } from "react-router-dom";
import HomeMiddle from "../../components/HomeMiddle/HomeMiddle";
import HomeRight from "../../components/HomeRight/HomeRight";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import "./home.scss";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const Home = () => {
  const { id } = useParams();

  // states
  const [user, setUser] = useState({});

  // get user using id and pass all the user data
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>
  );
};

export default Home;
