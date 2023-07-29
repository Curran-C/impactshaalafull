import { useState } from "react";
import { bell, search } from "../../../assets/home";
import "./adminSearch.scss";
import AdminPost from "../AdminPost/AdminPost";

const AdminSearch = () => {
  const [showPost, setShowPost] = useState(false);

  return (
    <div className="adminSearch">
      {showPost && <AdminPost onCancel={setShowPost} />}
      <div className="heading">
        <div className="title">
          <h1>Dashboard</h1>
          <h3>Good morning, Admin</h3>
        </div>
        <div className="notifs">
          <img src={bell} alt="" />
          <button onClick={() => setShowPost(true)}>Post</button>
        </div>
      </div>
      <div className="input">
        <img src={search} alt="" />
        <input placeholder='Search "Collaborations"' type="text" />
      </div>
    </div>
  );
};

export default AdminSearch;
