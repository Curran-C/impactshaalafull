import { useNavigate } from "react-router-dom";
import {
  AdminSearch,
  CancelCollab,
  LeftNavigation,
  MiniCollab,
} from "../../components";
import "./collabDetails.scss";
import { useState } from "react";

const CollabDetails = () => {
  const navigate = useNavigate();
  const [showCancelCollab, setShowCancelCollab] = useState(false);

  return (
    <div className="collabDetails">
      {showCancelCollab && <CancelCollab onCancel={setShowCancelCollab} />}
      <div className="left">
        <LeftNavigation page="collaborations" />
      </div>
      <div className="right">
        <AdminSearch />
        <div className="collabDetailsContainer">
          <MiniCollab status={"completed"} />
          <span>Posted by</span>
          <h5>Institute Name</h5>
          <p className="duration">
            12-03-23 &nbsp;&nbsp; - &nbsp;&nbsp; 12-04-23
          </p>
          <div className="text">
            <div className="tags">
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
              <p>tag</p>
            </div>
            <p className="actualText">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Curabitur tempus urna at turpis condimentum
              lobortis. Ut commodo efficitur neque.
            </p>
            <a href="">See Documentation</a>

            <div className="buttons">
              <button
                className="white"
                onClick={() => navigate("/admin/dashboard")}
              >
                Back home
              </button>
              <button onClick={() => setShowCancelCollab(true)}>
                Cancel Collaboration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollabDetails;
