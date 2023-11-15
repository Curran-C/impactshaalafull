import axiosInstance from "../../utils/service";
import "./CollaborationsRejected.scss";
import { useEffect, useState } from "react";
import CollaborationsCard from "../CollaborationsCard/CollaborationsCard";
import { Spin } from "antd";
import { useSelector } from "react-redux";

const CollaborationsRejected = () => {
  const authUser = useSelector((state) => state.authUser.user);

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
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${authUser._id}`
        );
        setCollabsRejectedIds(new Set(user?.data.collaborationIdsDeclined));
        // console.log(collabsRejectedIds);
        //todo loop over collabids and then get the collab for each id
        const collabRejectedIds = new Set(user?.data.collaborationIdsDeclined);
        const collabIdsArray = Array.from(collabRejectedIds);

        collabIdsArray?.map(async (collab) => {
          const collabs = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL
            }/api/collaboration/single/${collab}`
          );

          //todo use the fromId: in collabs to get userdetails
          const user = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${collabs?.data.fromId
            }`
          );
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
      {fromUsers?.map((user, index) => (
        <CollaborationsCard
          key={index}
          user={user}
          post={Posts[index]}
          collabId={collabsRejectedIds[index]?._id}
        />
      ))}

      {!loading && fromUsers?.length === 0 &&
        <p style={{ marginTop: "20px" }}><strong>No Rejected collabs</strong></p>
      }
      <Spin spinning={loading && !fromUsers?.length} />
    </div>
  );
};

export default CollaborationsRejected;
