import { trash } from "../../pages/adminReviews";
import "./review.scss";

const Review = ({ name, institute, review }) => {
  return (
    <div className="review">
      <div className="user">
        <div className="miniprofile">
          <img src="https://picsum.photos/200" alt="pfp" />
          <div className="about">
            <h2>{name}</h2>
            <p>{institute}</p>
          </div>
        </div>
        <div className="reviewcollabs">
          <p>see collaborations</p>
          <img src={trash} alt="" />
        </div>
      </div>

      <p className="text">{review}</p>
    </div>
  );
};

export default Review;
