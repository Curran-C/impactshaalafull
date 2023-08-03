import { AdminSearch, LeftNavigation, Review } from "../../components";
import "./reviews.scss";

const Reviews = () => {
  return (
    <div className="reviews">
      <div className="left">
        <LeftNavigation page={"useractivity"} />
      </div>
      <div className="right">
        <AdminSearch />
        <Review
          name="name"
          institute={"institute"}
          review={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque."
          }
        />
        <Review
          name="name"
          institute={"institute"}
          review={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque."
          }
        />
        <Review
          name="name"
          institute={"institute"}
          review={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque."
          }
        />
        <Review
          name="name"
          institute={"institute"}
          review={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque."
          }
        />
      </div>
    </div>
  );
};

export default Reviews;
