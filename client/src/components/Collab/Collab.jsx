import CollabCard from "../CollabCard/CollabCard";
import "./collab.scss";

const Collab = () => {
  return (
    <div className="collab">
      <h3>Looking for Collaborations?</h3>
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
