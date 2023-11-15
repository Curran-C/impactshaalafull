import "./collaborationsRecieved.scss";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/service";
import CollaborationsCard from "../CollaborationsCard/CollaborationsCard";
import { Spin } from "antd";
import { useSelector } from "react-redux";

const CollaborationsRecieved = () => {
  const authUser = useSelector((state) => state.authUser.user);
  const [fromUsers, setFromUsers] = useState([]);
  const [collabIds, setCollabIds] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const resCollabGot = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/singletoId/${authUser._id
          }`
        );
        const requestedCollabs = resCollabGot.data.filter(collab => collab.completed === 'requested');
        setCollabs(requestedCollabs);
        console.log(resCollabGot.data);
        console.log("first");
        requestedCollabs?.map(async (collab) => {
          try {
            console.log(collab.fromId);
            const resFromUser = await axiosInstance.get(
              `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${collab.fromId
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
  }, [isAccepted]);

  return (
    <div className="collaborationsRecieved">
      {fromUsers?.map((user, index) => (
        <CollaborationsCard
          key={index}
          user={user}
          post={post[index]}
          collabId={collabs[index]?._id}
          page={"collabsRecieved"}
          setIsAccepted={setIsAccepted}
          isAccepted={isAccepted}
        />
      ))}
      {!loading && fromUsers?.length === 0 &&
        <p style={{ marginTop: "20px" }}><strong>No Recevied collabs</strong></p>
      }
      <Spin spinning={loading && !fromUsers?.length} />
    </div>
  );
};

export default CollaborationsRecieved;
