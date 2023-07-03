import "./homeMiddle.scss";

import Search from "../Search/Search";
import Posts from "../Posts/Posts";
import Collab from "../Collab/Collab";

const HomeMiddle = () => {
  return (
    <div className="homeMiddle">
      <Search />
      <Posts />
      <Collab />
    </div>
  );
};

export default HomeMiddle;
