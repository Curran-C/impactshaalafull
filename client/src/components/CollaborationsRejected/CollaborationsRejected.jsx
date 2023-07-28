import axios from "axios";
import "./collaborationsRejected.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollaborationsCard from "../CollaborationsCard/CollaborationsCard";

const CollaborationsRejected = () => {
  const { id } = useParams();

  const [collabsRejectedIds, setCollabsRejectedIds] = useState();
  const [collabsRejected, setCollabsRejected] = useState([]);
  const [fromUsers, setFromUsers] = useState([]);
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    //todo use to userdetails in the collab card
    const getUser = async () => {
      try {
        //todo get collab ids from user
        const user = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${id}`
        );
        setCollabsRejectedIds(user?.data.collaborationIdsDeclined);
        console.log(collabsRejectedIds);
        //todo loop over collabids and then get the collab for each id
        collabsRejectedIds?.map(async (collab) => {
          const collabs = await axios.get(
            `${
              import.meta.env.VITE_BASE_URL
            }/api/collaboration/single/${collab}`
          );
          setCollabsRejected((prev) => [...prev, collabs?.data]);
          console.log(collabsRejected);

          //todo use the fromId: in collabs to get userdetails
          collabsRejected?.map(async (collab) => {
            const user = await axios.get(
              `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${
                collab.fromId
              }`
            );
            console.log(user.data);
            setPosts((prev) => [...prev, collab.postId]);
            setFromUsers((prev) => [...prev, user?.data]);
          });
        });
      } catch (err) {
        console.log(err);
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
          collabId={collabsRejected[index]._id}
        />
      ))}
    </div>
  );
};

export default CollaborationsRejected;
