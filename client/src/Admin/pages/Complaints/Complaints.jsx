import { useState, useEffect } from "react";
import axios from "axios";
import {
  AdminSearch,
  CancelCollab,
  Complaint,
  LeftNavigation,
} from "../../components";
import "./complaints.scss";
import { useOutletContext } from "react-router-dom";

const Complaints = () => {
  const { setPageTitle } = useOutletContext();

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
    setPageTitle("complaints");
  }, []);

  return (
    <div className="complaints">
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
  );
};

export default Complaints;
