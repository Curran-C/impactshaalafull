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
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/singletoId/${id}`
        );
        setCollabs(resCollabGot.data);
        console.log(resCollabGot.data);
        console.log("first");
        resCollabGot.data?.map(async (collab) => {
          try {
            console.log(collab.fromId);
            const resFromUser = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${
                collab.fromId
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
