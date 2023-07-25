import { useParams } from "react-router-dom";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import "./collaborationsRecieved.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const CollaborationsRecieved = () => {
  const { id } = useParams();
  const [fromUsers, setFromUsers] = useState([]);
  const [collabs, setCollabs] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const resCollabGot = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/collaboration/singletoId/${id}`
        );
        setCollabs(resCollabGot.data);
        collabs?.map(async (collab) => {
          console.log(collab.fromId);
          try {
            const resFromUser = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${
                collab.fromId
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
    <div className="collaborationsRecieved">
      {console.log(fromUsers)}
      {fromUsers?.map((user, index) => (
        <FeedbackCard key={index} user={user} />
      ))}
    </div>
  );
};

export default CollaborationsRecieved;
