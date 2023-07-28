import { useParams } from "react-router-dom";
import "./collaborationsRecieved.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import CollaborationsCard from "../CollaborationsCard/CollaborationsCard";

const CollaborationsRecieved = () => {
  const { id } = useParams();
  const [fromUsers, setFromUsers] = useState([]);
  const [collabIds, setCollabIds] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [post, setPosts] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const resCollabGot = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        setCollabIds(resCollabGot?.data.collaborationIds);
        console.log(collabIds);
        collabIds?.map(async (collabId) => {
          console.log(collabId);
          try {
            const resCollab = await axios.get(
              `${
                import.meta.env.VITE_BASE_URL
              }/api/collaboration/single/${collabId}`
            );
            setCollabs((prev) => [...prev, resCollab?.data]);
            collabs?.map(async (collab) => {
              const user = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${
                  collab.fromId
                }`
              );
              setPosts((prev) => [...prev, collab.postId]);
              setFromUsers((prev) => [...prev, user?.data]);
            });
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
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
          post={post[index]}
          collabId={collabs[index]._id}
          page={"collabsRecieved"}
        />
      ))}
    </div>
  );
};

export default CollaborationsRecieved;
