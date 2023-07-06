import "./homeMiddle.scss";

import Search from "../Search/Search";
import Posts from "../Posts/Posts";
import Collab from "../Collab/Collab";

const HomeMiddle = () => {
  return (
    <div className="homeMiddle">
      <Search />
      <h1 className="title">Recent Posts</h1>
      <Posts />
      <Collab />
      {/* <Posts /> */}
    </div>
  );
};

export default HomeMiddle;
