import { useState } from "react";
import {
  AdminSearch,
  CancelCollab,
  Complaint,
  LeftNavigation,
} from "../../components";
import "./complaints.scss";

const Complaints = () => {

  return (
    <div className="complaints">
      
      <div className="left">
        <LeftNavigation page={"complaints"} />
      </div>
      <div className="right">
        <AdminSearch />
        <div className="stakeholders">
          <p>NGOs</p>
          <p>Corporates</p>
          <p>Working Professionals</p>
          <p>Institutes</p>
        </div>

        <div className="complainsContainer">
          <Complaint
            username={"Lorem Ipsum"}
            institute={"institute"}
            complaint={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis."
            }
            id={1}
          />
          <Complaint
            username={"Lorem Ipsum"}
            institute={"institute"}
            complaint={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis."
            }
            id={1}
          />
          <Complaint
            username={"Lorem Ipsum"}
            institute={"institute"}
            complaint={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis."
            }
            id={1}
          />
          <Complaint
            username={"Lorem Ipsum"}
            institute={"institute"}
            complaint={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis."
            }
            id={1}
          />
        </div>
      </div>
    </div>
  );
};

export default Complaints;
