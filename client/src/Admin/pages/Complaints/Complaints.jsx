import { useState, useEffect } from "react";
import axios from "axios";
import {
  AdminSearch,
  CancelCollab,
  Complaint,
  LeftNavigation,
} from "../../components";
import "./complaints.scss";

const Complaints = () => {
  const [complaints, setComplaint] = useState([]);
  useEffect(() => {
    const getComplaints = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/feedback/all`
        );
        setComplaint(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getComplaints();
  }, []);
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
          {complaints.map((complaint) => (
            // eslint-disable-next-line react/jsx-key
            <Complaint
              userId={complaint.userId}
              complaint={complaint.text}
              id={complaint._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complaints;
