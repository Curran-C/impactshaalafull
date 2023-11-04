import { useEffect, useState } from "react";
import "./collaborationsSent.scss";
import axiosInstance from "../../utils/service";
import { useParams } from "react-router-dom";
import CollaborationsCard from "../CollaborationsCard/CollaborationsCard";
import { Spin } from 'antd';

const CollaborationsSent = () => {
  const { id } = useParams();
  const [fromUsers, setFromUsers] = useState([]);
  const [collabs, setCollabs] = useState();
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const resCollabGot = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL
          }/api/collaboration/singlefromId/${id}`
        );
        setCollabs(resCollabGot.data);
        console.log(resCollabGot.data);
        console.log("first");
        resCollabGot.data?.map(async (collab) => {
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
      <Spin spinning={loading} fullscreen />  
    </div>
  );
};

export default CollaborationsSent;
