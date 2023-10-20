import React, { useState } from "react";
import "./addProjectAccomplishmentsPopUp.scss";

import Modal from "../Modal/Modal";

function AddProjectAccomplishmentsPopUp({ toggleModal, onSubmit }) {
  const [formData, setFormData] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
    beneficiaries: "",
    projectLocation: "",
    attachments: null,
    benefitStudents: "",
    enhanceEducation: "",
    alignmentGoals: "",
    impactData: "",
  });
  const [page, setPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    if (formData?.attachments) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.attachments);
      reader.onload = async () => {
        const base64String = reader.result;
        const updatedFormData = { ...formData, attachments: base64String };
        await onSubmit(updatedFormData);
        toggleModal(false);
        setSubmitting(false);
      };
    } else {
      await onSubmit(formData);
      setSubmitting(false);
      toggleModal(false);
    }
  };

  return (
    <Modal>
      <form className="add-project-acc-container" onSubmit={handleSubmit}>
        <h4 className="title">Fill Project Accomplishment Details</h4>
        {page === 1 && (
          <>
            <div className="data_input">
              <label htmlFor="projectName" className="form-label">
                Project Name
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={onChangeHandler}
              />
            </div>
            <div className="data_input">
              <label htmlFor="startDate" className="form-label">
                Project Start Date
              </label>
              <input
                required
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={onChangeHandler}
              />
            </div>
            <div className="data_input">
              <label htmlFor="endDate" className="form-label">
                Project End Date
              </label>
              <input
                required
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={onChangeHandler}
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
                onChange={onChangeHandler}
                rows="4"
              ></textarea>
            </div>
            <div className="data_input">
              <label htmlFor="projectLocation" className="form-label">
                Project Location
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="projectLocation"
                name="projectLocation"
                value={formData.projectLocation}
                onChange={onChangeHandler}
              />
            </div>
            <div className="data_file">
              <label className="form-label">Attachments</label>
              <input
                required
                type="file"
                className="form-control-file"
                id="attachments"
                name="attachments"
                onChange={onChangeHandler}
              />
            </div>
            <div className="footer-buttons">
              <button
                type="reset"
                className="cancel-button"
                onClick={() => toggleModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="page-button"
                onClick={() => setPage(2)}
                disabled={
                  !formData.projectName ||
                  !formData.startDate ||
                  !formData.endDate ||
                  !formData.beneficiaries ||
                  !formData.projectLocation ||
                  !formData.attachments
                    ? true
                    : false
                }
              >
                Continue
              </button>
            </div>
          </>
        )}
        {page === 2 && (
          <>
            <div className="data_input_radio">
              <label className="form-label">
                1. How well did the project benefit the students of your
                institution?
              </label>
              <div className="radio_container">
                <div>
                  <input
                    required
                    type="radio"
                    id="benefitVeryLittle"
                    name="benefitStudents"
                    value="Very Little"
                    checked={formData.benefitStudents === "Very Little"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="benefitVeryLittle">Very Little</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="benefitSomewhat"
                    name="benefitStudents"
                    value="Somewhat"
                    checked={formData.benefitStudents === "Somewhat"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="benefitSomewhat">Somewhat</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="benefitModerately"
                    name="benefitStudents"
                    value="Moderately"
                    checked={formData.benefitStudents === "Moderately"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="benefitModerately">Moderately</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="benefitQuiteBit"
                    name="benefitStudents"
                    value="Quite a bit"
                    checked={formData.benefitStudents === "Quite a bit"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="benefitQuiteBit">Quite a bit</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="benefitGreatDeal"
                    name="benefitStudents"
                    value="A Great Deal"
                    checked={formData.benefitStudents === "A Great Deal"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="benefitGreatDeal">A Great Deal</label>
                </div>
              </div>
            </div>
            <div className="data_input_radio">
              <label className="form-label">
                2. To what extent did the project contribute to enhancing the
                educational experience?
              </label>
              <div className="radio_container">
                <div>
                  <input
                    required
                    type="radio"
                    id="enhanceVeryLittle"
                    name="enhanceEducation"
                    value="Very Little"
                    checked={formData.enhanceEducation === "Very Little"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="enhanceVeryLittle">Very Little</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="enhanceSomewhat"
                    name="enhanceEducation"
                    value="Somewhat"
                    checked={formData.enhanceEducation === "Somewhat"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="enhanceSomewhat">Somewhat</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="enhanceModerately"
                    name="enhanceEducation"
                    value="Moderately"
                    checked={formData.enhanceEducation === "Moderately"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="enhanceModerately">Moderately</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="enhanceQuiteBit"
                    name="enhanceEducation"
                    value="Quite a bit"
                    checked={formData.enhanceEducation === "Quite a bit"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="enhanceQuiteBit">Quite a bit</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="enhanceGreatDeal"
                    name="enhanceEducation"
                    value="A Great Deal"
                    checked={formData.enhanceEducation === "A Great Deal"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="enhanceGreatDeal">A Great Deal</label>
                </div>
              </div>
            </div>
            <div className="data_input_radio">
              <label className="form-label">
                3. How well did the collaboration align with your project's
                goals and mission?
              </label>
              <div className="radio_container">
                <div>
                  <input
                    required
                    type="radio"
                    id="alignmentNotAligned"
                    name="alignmentGoals"
                    value="Not Aligned at All"
                    checked={formData.alignmentGoals === "Not Aligned at All"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="alignmentNotAligned">
                    Not Aligned at All
                  </label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="alignmentSlightlyAligned"
                    name="alignmentGoals"
                    value="Slightly Aligned"
                    checked={formData.alignmentGoals === "Slightly Aligned"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="alignmentSlightlyAligned">
                    Slightly Aligned
                  </label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="alignmentModeratelyAligned"
                    name="alignmentGoals"
                    value="Moderately Aligned"
                    checked={formData.alignmentGoals === "Moderately Aligned"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="alignmentModeratelyAligned">
                    Moderately Aligned
                  </label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="alignmentMostlyAligned"
                    name="alignmentGoals"
                    value="Mostly Aligned"
                    checked={formData.alignmentGoals === "Mostly Aligned"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="alignmentMostlyAligned">Mostly Aligned</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="alignmentPerfectlyAligned"
                    name="alignmentGoals"
                    value="Perfectly Aligned"
                    checked={formData.alignmentGoals === "Perfectly Aligned"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="alignmentPerfectlyAligned">
                    Perfectly Aligned
                  </label>
                </div>
              </div>
            </div>
            <div className="data_input_radio">
              <label className="form-label">
                4. Please rate the qualitative or quantitative impact data
                showcasing the project's impact (attendance, participation,
                etc.)
              </label>
              <div className="radio_container">
                <div>
                  <input
                    required
                    type="radio"
                    id="impactVeryLow"
                    name="impactData"
                    value="Very Low Impact"
                    checked={formData.impactData === "Very Low Impact"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="impactVeryLow">Very Low Impact</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="impactLow"
                    name="impactData"
                    value="Low Impact"
                    checked={formData.impactData === "Low Impact"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="impactLow">Low Impact</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="impactModerate"
                    name="impactData"
                    value="Moderate Impact"
                    checked={formData.impactData === "Moderate Impact"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="impactModerate">Moderate Impact</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="impactHigh"
                    name="impactData"
                    value="High Impact"
                    checked={formData.impactData === "High Impact"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="impactHigh">High Impact</label>
                </div>
                <div>
                  <input
                    required
                    type="radio"
                    id="impactVeryHigh"
                    name="impactData"
                    value="Very High Impact"
                    checked={formData.impactData === "Very High Impact"}
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="impactVeryHigh">Very High Impact</label>
                </div>
              </div>
            </div>
            <div className="footer-buttons">
              <button
                type="reset"
                className="cancel-button"
                onClick={() => toggleModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="page-button"
                onClick={() => setPage(1)}
              >
                Back
              </button>
              {!submitting ? (
                <button type="submit" className="submit-button">
                  Submit
                </button>
              ) : (
                <button type="submit" className="submit-button" disabled>
                  Submitting...
                </button>
              )}
            </div>
          </>
        )}
      </form>
    </Modal>
  );
}

export default AddProjectAccomplishmentsPopUp;
