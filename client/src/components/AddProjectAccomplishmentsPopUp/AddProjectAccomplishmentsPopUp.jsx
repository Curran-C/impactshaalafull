import React, { useState } from "react";
import "./addProjectAccomplishmentsPopUp.scss";

import Modal from "../Modal/Modal";

function AddProjectAccomplishmentsPopUp({ onValueChange }) {
  const [formData, setFormData] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
    beneficiaries: "",
    projectLocation: "",
    attachments: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // api call here
    onValueChange(false);
  };

  return (
    <Modal>
      <form className="add-project-acc-container" onSubmit={handleSubmit}>
        <h4 className="title">Fill Project Accomplishment Details</h4>
        <div className="data_input">
          <label htmlFor="projectName" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>
        <div className="data_input">
          <label htmlFor="startDate" className="form-label">
            Project Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="data_input">
          <label htmlFor="endDate" className="form-label">
            Project End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="data_input">
          <label htmlFor="beneficiaries" className="form-label">
            Beneficiaries and Gains
          </label>
          <textarea
            className="form-control"
            id="beneficiaries"
            name="beneficiaries"
            value={formData.beneficiaries}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <div className="data_input">
          <label htmlFor="projectLocation" className="form-label">
            Project Location
          </label>
          <input
            type="text"
            className="form-control"
            id="projectLocation"
            name="projectLocation"
            value={formData.projectLocation}
            onChange={handleChange}
          />
        </div>
        <div className="data_file">
          <label className="form-label">Attachments</label>
          <input
            type="file"
            className="form-control-file"
            id="attachments"
            name="attachments"
            onChange={handleChange}
          />
        </div>
        <div className="footer-buttons">
          <button
            type="reset"
            className="cancel-button"
            onClick={() => onValueChange(false)}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddProjectAccomplishmentsPopUp;
