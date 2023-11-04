import { useState } from "react";
import "./contactUs.scss";
import emailjs from "@emailjs/browser";
import axiosInstance from "../../utils/service";
import { useParams } from "react-router-dom";
import Modal from "../Modal/Modal";

const ContactUs = ({ onCancel, email }) => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    email: email,
    collaborateWith: [],
    objective: "",
    tenure: "Choose a tenure",
    startDate: "",
    endDate: "",
    attachment: null,
    additionalDetails: "",
    keywords: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      const selectedValues = form[name] || [];
      let updatedValues;

      if (checked) {
        updatedValues = [...selectedValues, value];
      } else {
        updatedValues = selectedValues.filter((item) => item !== value);
      }

      setForm({ ...form, [name]: updatedValues });
    } else if (type === "file") {
      setForm({ ...form, [name]: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleEmail = (e) => {
    e.preventDefault();
    oncancel(false);
    emailjs
      .send(
        "service_t1zgvzr",
        "template_6ojdncx",
        {
          name: form.name,
          email: email,
          subject: form.objective,
          message: form.additionalDetails,
        },
        "pdWGRZTcDsXSx5UcT"
      )
      .then(
        () => {
          alert("Thank you, we will get back to you");
          onCancel(false);
        },
        (err) => {
          console.log(err);
          alert("Something went wrong");
        }
      );

    axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/api/feedback/create`, {
      userId: id,
      text: form.additionalDetails,
    });
  };

  return (
    <Modal>
      <form onSubmit={handleEmail} className="contactus-wrapper">
        <h2 className="modal-title">Get in Touch</h2>
        <div className="inputs-container">
          <div className="input">
            <h4>Title</h4>
            <input
              required
              onChange={handleInputChange}
              type="text"
              placeholder="Title"
              name="name"
              value={form.name}
            />
          </div>
          <input
            required
            hidden
            value={email}
            type="email"
            disabled
            name="email"
          />
          <div className="input">
            <h4>Who do you want to collaborate with?</h4>
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  name="collaborateWith"
                  value="Educational Institutions"
                  onChange={handleInputChange}
                  checked={form.collaborateWith.includes(
                    "Educational Institutions"
                  )}
                />
                Educational Institutions
              </label>

              <label>
                <input
                  type="checkbox"
                  name="collaborateWith"
                  value="Corporates"
                  onChange={handleInputChange}
                  checked={form.collaborateWith.includes("Corporates")}
                />
                Corporates
              </label>

              <label>
                <input
                  type="checkbox"
                  name="collaborateWith"
                  value="NGOs"
                  onChange={handleInputChange}
                  checked={form.collaborateWith.includes("NGOs")}
                />
                NGOs
              </label>

              <label>
                <input
                  type="checkbox"
                  name="collaborateWith"
                  value="Working Professional"
                  onChange={handleInputChange}
                  checked={form.collaborateWith.includes(
                    "Working Professional"
                  )}
                />
                Working Professional
              </label>
            </div>
          </div>
          <div className="input">
            <h4>Objective</h4>
            <input
              required
              onChange={handleInputChange}
              type="text"
              placeholder="What is this email about?"
              name="objective"
              value={form.objective}
            />
          </div>
          <div className="input">
            <h4>Description</h4>
            <textarea
              required
              onChange={handleInputChange}
              type="text"
              placeholder="Write a short description"
              name="description"
              value={form.description}
              rows={3}
            />
          </div>
          <div className="input">
            <h4>Project Tenure</h4>
            <select
              onChange={handleInputChange}
              name="tenure"
              id="tenure"
              value={form.tenure}
            >
              <option value="Micro Projects: (1 to 3 days)">
                Micro Projects: (1 to 3 days)
              </option>
              <option value="Week-Long Projects: (4 to 7 days)">
                Week-Long Projects: (4 to 7 days)
              </option>
              <option value="Month-long projects: (25 to 31 days)">
                Month-long projects: (25 to 31 days)
              </option>
              <option value="Quarterly Projects: (3 months)">
                Quarterly Projects: (3 months)
              </option>
              <option value="Semester Projects: (4 to 6 months)">
                Semester Projects: (4 to 6 months)
              </option>
              <option value="Year-Long Projects: (12 months)">
                Year-Long Projects: (12 months)
              </option>
            </select>
          </div>
          <div className="input">
            <h4>Start and End Dates</h4>
            <div className="start-end-dates">
              <input
                onChange={handleInputChange}
                type="date"
                name="startDate"
                id="startDate"
                value={form.startDate}
              />
              <input
                onChange={handleInputChange}
                type="date"
                name="endDate"
                id="endDate"
                value={form.endDate}
              />
            </div>
          </div>
          <div className="input">
            <h4>Attachment</h4>
            <input
              type="file"
              id="attachment"
              name="attachment"
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <h4>Additional Details</h4>
            <textarea
              required
              onChange={handleInputChange}
              rows={3}
              placeholder="Add more information..."
              type="text"
              name="additionalDetails"
              value={form.additionalDetails}
            />
          </div>
          <div className="input">
            <h4>Collaboration Keywords</h4>
            <textarea
              required
              onChange={handleInputChange}
              rows={2}
              placeholder="Separate keywords with comma(,)"
              type="text"
              name="keywords"
              value={form.keywords}
            />
          </div>
        </div>
        <div className="footer-buttons">
          <button
            className="cancel-button"
            type="button"
            onClick={() => onCancel(false)}
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

export default ContactUs;
