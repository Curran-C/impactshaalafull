import { useEffect, useState } from "react";
import "./CollaborationsAccepted.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import CollaborationsCard from "../../CollaborationsCard/CollaborationsCard";

const CollaborationsAccepted = () => {
  const { id } = useParams();

  const [collabsAcceptedIds, setCollabsAcceptedIds] = useState();
  const [collabsAccepted, setCollabsAccepted] = useState([]);
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
        setCollabsAcceptedIds(user?.data.collaborationIdsAccepted);
        console.log(collabsAcceptedIds);
        //todo loop over collabids and then get the collab for each id
        user?.data.collaborationIdsAccepted.map(async (collab) => {
          const collabs = await axios.get(
            `${
              import.meta.env.VITE_BASE_URL
            }/api/collaboration/single/${collab}`
          );

          //todo use the fromId: in collabs to get userdetails
          const user = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/company/getuser/${
              collabs?.data.fromId
            }`
          );
          console.log(user.data);
          setPosts((prev) => [...prev, collab.postId]);
          setFromUsers((prev) => [...prev, user?.data]);
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
          collabId={collabsAccepted[index]?._id}
          page={"collabsAccepted"}
        />
      ))}
    </div>
  );
};

export default CollaborationsAccepted;
