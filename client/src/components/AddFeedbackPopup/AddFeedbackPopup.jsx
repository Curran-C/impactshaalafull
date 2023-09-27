import { useState } from "react";
import Modal from "../Modal/Modal";
import "./AddFeedbackPopup.scss";

const AddFeedbackPopup = ({ toggleModal, onSubmit }) => {
  const [formData, setFormData] = useState({
    text: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formData.text.trim()) {
      return setFormData({
        text: "",
      });
    }
    setSubmitting(true);
    try {
      await onSubmit({ text: formData.text.trim() });
      toggleModal(false);
    } catch (error) {
      console.error("Error creating new feedback : ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal>
      <form className="add-feedback-form" onSubmit={formSubmitHandler}>
        <h3 className="modal-title">Add Feedback</h3>
        {/* <div className="data_input">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.projectName}
            onChange={onChangeHandler}
          />
        </div> */}
        <div className="data_input">
          <label htmlFor="description" className="form-label">
            Feedback
          </label>
          <textarea
            className="form-control"
            id="text"
            name="text"
            value={formData.text}
            onChange={onChangeHandler}
            rows="4"
          ></textarea>
        </div>
        <div className="footer-buttons">
          <button
            type="reset"
            className="cancel-button"
            onClick={() => toggleModal(false)}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={submitting}>
            {!submitting ? "Submit" : "Submitting..."}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddFeedbackPopup;
