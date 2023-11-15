import "./homeMiddle.scss";

import Posts from "../Posts/Posts";
import Collab from "../Collab/Collab";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllPostsAPI } from "../../api/post";
import ContactUs from "../ContactUs/ContactUs";
import axiosInstance from "../../utils/service";

const HomeMiddle = () => {
  const [posts, setPosts] = useState([]);
  const { user, setPageLoading } = useOutletContext();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [ongoingCompletedCollabsIds, setOngoingCompletedCollabsIds] = useState([]);

  const fetchPosts = async () => {
    try {
      setPageLoading(true);
      const data = await getAllPostsAPI();
      setPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const getOngoingCompletedCollabsIds = async () => {
    try {
      const { data: ongoingCompletedIds } = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/collaboration/getAllOngoingCompletedCollabs`
      );
      setOngoingCompletedCollabsIds(ongoingCompletedIds);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getOngoingCompletedCollabsIds();
  }, [])

  return (
    <div className="homeMiddle">
      <Posts posts={posts} ongoingCompletedCollabsIds={ongoingCompletedCollabsIds}/>
      <Collab />
      <div className="getInTouch">
        <h4>Need help with collaborating?</h4>
        <button onClick={() => setShowEmailForm(true)}>Get in Touch</button>
      </div>
      {showEmailForm && (
        <ContactUs email={user?.email} onCancel={setShowEmailForm} />
      )}
    </div>
  );
};

export default HomeMiddle;
