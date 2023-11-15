import { useEffect, useState } from "react";
import "./collaborationsSent.scss";
import axiosInstance from "../../utils/service";
import CollaborationsCard from "../CollaborationsCard/CollaborationsCard";
import { Spin } from "antd";
import { useSelector } from "react-redux";

const CollaborationsSent = () => {
  const authUser = useSelector((state) => state.authUser.user);

  const [fromUsers, setFromUsers] = useState([]);
  const [collabs, setCollabs] = useState();
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const resCollabGot = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/singlefromId/${authUser._id
          }`
        );
        const requestedCollabs = resCollabGot.data.filter(collab => collab.completed === 'requested');
        setCollabs(requestedCollabs);
        requestedCollabs?.map(async (collab) => {
          try {
            console.log(collab.fromId);
            const resFromUser = await axiosInstance.get(
              `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${collab.toId
              }`
            );
            setFromUsers((prev) => [...prev, resFromUser?.data]);
            setPosts((prev) => [...prev, collab.postId]);
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);
  return (
    <div className="collaborationsSent">
      {fromUsers.length > 0 &&
        fromUsers?.map((user, index) => (
          <CollaborationsCard key={index} user={user} post={post[index]} />
        ))}
      {!loading && fromUsers?.length === 0 &&
        <p style={{ marginTop: "20px" }}><strong>No Requested collabs</strong></p>
      }
      <Spin spinning={loading && !fromUsers?.length} />
    </div>
  );
};

export default CollaborationsSent;
