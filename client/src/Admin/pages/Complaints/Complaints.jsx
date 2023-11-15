import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/service";
import {
  AdminSearch,
  CancelCollab,
  Complaint,
  LeftNavigation,
} from "../../components";
import "./complaints.scss";
import { useOutletContext } from "react-router-dom";
import { Spin } from "antd";

const Complaints = () => {
  const { setPageTitle } = useOutletContext();
  const [loading, setLoading] = useState(false);

  const [complaints, setComplaint] = useState([]);
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);

  useEffect(() => {
    const getComplaints = async () => {
      try {
        const res = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/feedback/getAll?stakeholder=${selectedStakeholder}`
        );
        console.log("res", res);
        setComplaint(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getComplaints();
    setPageTitle("complaints");
  }, [selectedStakeholder]);

  const handleStakeholderClick = (stakeholder) => {
    if (stakeholder === "See All") {
      setSelectedStakeholder("");
    } else {
      setSelectedStakeholder(stakeholder);
    }
  };


  return (
    <div className="complaints">
      <AdminSearch />
      <div className="stakeholders">
        {["NGO", "Corporate", "Working Professional", "Educational Institution", "See All"].map((stakeholder) => (
          <p
            key={stakeholder}
            onClick={() => handleStakeholderClick(stakeholder)}
            className={selectedStakeholder === stakeholder ? "highlighted" : ""}
          >
            {stakeholder}
          </p>
        ))}
      </div>

      <div className="complainsContainer">
        {complaints.map((complaint, index) => (
          // eslint-disable-next-line react/jsx-key
          <Complaint
            key={index}
            complaint={complaint}
          />
        ))}
      </div>
    </div>
  );
};

export default Complaints;
