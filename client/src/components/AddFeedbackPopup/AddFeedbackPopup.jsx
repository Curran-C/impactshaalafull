import { useState } from "react";
import Modal from "../Modal/Modal";
import "./AddFeedbackPopup.scss";

const AddFeedbackPopup = ({ toggleModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formData);
    toggleModal(false)
  };

  return (
    <Modal>
      <form className="add-feedback-form" onSubmit={formSubmitHandler}>
        <h3 className="modal-title">Add Feedback</h3>
        <div className="data_input">
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
        </div>
        <div className="data_input">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
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
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddFeedbackPopup;
