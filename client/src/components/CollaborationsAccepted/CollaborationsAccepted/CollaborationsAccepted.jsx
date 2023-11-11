import { useEffect, useState } from "react";
import "./CollaborationsAccepted.scss";
import axiosInstance from "../../../utils/service";
import CollaborationsCard from "../../CollaborationsCard/CollaborationsCard";
import { Spin } from "antd";
import { useSelector } from "react-redux";

const CollaborationsAccepted = () => {
  const authUser = useSelector((state) => state.authUser.user);

  const [collabsAcceptedIds, setCollabsAcceptedIds] = useState();
  const [collabsAccepted, setCollabsAccepted] = useState([]);
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
        setCollabsAcceptedIds(user?.data.collaborationIdsAccepted);
        // console.log("asdsads",user.data.collaborationIdsAccepted);
        // console.log(collabsAcceptedIds);
        //todo loop over collabids and then get the collab for each id
        user?.data.collaborationIdsAccepted.map(async (collab) => {
          const collabs = await axiosInstance.get(
            `${
              import.meta.env.VITE_BASE_URL
            }/api/collaboration/single/${collab}`
          );

          //todo use the fromId: in collabs to get userdetails
          const user = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${
              collabs?.data.fromId
            }`
          );
          console.log(user.data);
          setPosts((prev) => [...prev, collabs.data.postId]);
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
          collabId={collabsAcceptedIds[index]?._id}
          page={"collabsAccepted"}
        />
      ))}
      <Spin spinning={loading && !fromUsers?.length} />
    </div>
  );
};

export default CollaborationsAccepted;
