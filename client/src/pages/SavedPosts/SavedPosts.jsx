import "./savedPosts.scss";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import Search from "../../components/Search/Search";
import HomeRight from "../../components/HomeRight/HomeRight";
import Posts from "../../components/Posts/Posts";

const SavedPosts = () => {
  return (
    <div className="savedPosts">
      <div className="left">
        <ProfileLeft page={"savedPosts"} />
      </div>
      <div className="center">
        <Search />
        <h1>Saved Posts</h1>
        <Posts />
      </div>
      <div className="right">
        <HomeRight />
      </div>
    </div>
  );
};

export default SavedPosts;
