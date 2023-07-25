import { useEffect, useState } from "react";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import "./collaborationsSent.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const CollaborationsSent = () => {
  const { id } = useParams();
  const [fromUsers, setFromUsers] = useState([]);
  const [collabs, setCollabs] = useState();

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
      {console.log(fromUsers)}
      {fromUsers?.map((user, index) => (
        <FeedbackCard key={index} user={user} />
      ))}
    </div>
  );
};

export default CollaborationsSent;
