import CollabCard from "../CollabCard/CollabCard";
import "./collab.scss";

const Collab = () => {
  return (
    <div className="collab">
      <h1>Looking for Collaborations?</h1>
      <div className="companyNames">
        <CollabCard />
        <CollabCard />
        <CollabCard />
        {/* <CollabCard /> */}
      </div>
    </div>
  );
};

export default Collab;
