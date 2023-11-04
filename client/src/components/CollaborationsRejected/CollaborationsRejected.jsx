import axiosInstance from "../../utils/service";
import "./CollaborationsRejected.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollaborationsCard from "../CollaborationsCard/CollaborationsCard";
import { Spin } from 'antd';

const CollaborationsRejected = () => {
  const { id } = useParams();

  const [collabsRejectedIds, setCollabsRejectedIds] = useState();
  const [collabsRejected, setCollabsRejected] = useState([]);
  const [fromUsers, setFromUsers] = useState([]);
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //todo use to userdetails in the collab card
    const getUser = async () => {
      setLoading(true);
      try {
        //todo get collab ids from user
        const user = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        setCollabsRejectedIds(user?.data.collaborationIdsDeclined);
        console.log(collabsRejectedIds);
        //todo loop over collabids and then get the collab for each id
        user?.data.collaborationIdsDeclined.map(async (collab) => {
          const collabs = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL
            }/api/collaboration/single/${collab}`
          );

          //todo use the fromId: in collabs to get userdetails
          const user = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${collabs?.data.fromId
            }`
          );
          console.log(user.data);
          setPosts((prev) => [...prev, collabs?.data.postId]);
          setFromUsers((prev) => [...prev, user?.data]);
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
    <div className="collaborationsRecieved">
      {console.log(Posts)}
      {fromUsers?.map((user, index) => (
        <CollaborationsCard
          key={index}
          user={user}
          post={Posts[index]}
          collabId={collabsRejectedIds[index]?._id}
        />
      ))}
      <Spin spinning={loading} fullscreen />
    </div>
  );
};

export default CollaborationsRejected;
