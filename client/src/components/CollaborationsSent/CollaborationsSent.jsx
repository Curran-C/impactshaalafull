import { useEffect, useState } from "react";
import "./collaborationsSent.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import CollaborationsCard from "../CollaborationsCard/CollaborationsCard";

const CollaborationsSent = () => {
  const { id } = useParams();
  const [fromUsers, setFromUsers] = useState([]);
  const [collabs, setCollabs] = useState();
  const [post, setPosts] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const resCollabGot = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/collaboration/singlefromId/${id}`
        );
        setCollabs(resCollabGot.data);
        collabs?.map(async (collab) => {
          console.log(collab.fromId);
          try {
            const resFromUser = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${
                collab.toId
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
    <div className="collaborationsSent">
      {fromUsers?.map((user, index) => (
        <CollaborationsCard key={index} user={user} post={post[index]} />
      ))}
    </div>
  );
};

export default CollaborationsSent;
