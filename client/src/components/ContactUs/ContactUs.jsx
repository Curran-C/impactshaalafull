import { useState } from "react";
import "./contactUs.scss";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useParams } from "react-router-dom";

const ContactUs = ({ onCancel, email }) => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_t1zgvzr",
        "template_6ojdncx",
        {
          name: form.name,
          email: email,
          subject: form.subject,
          message: form.message,
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

      axios.post(`${import.meta.env.VITE_BASE_URL}/api/feedback/create`, {
        userId: id,
        text: form.message,
      });
  };

  return (
    <div>
      <div className="contactUs">
        <div className="blackbg" onClick={() => onCancel(false)}></div>
        <div className="container">
          <form onSubmit={handleEmail} className="wrapper">
            <h1>Get in Touch</h1>
            <div className="input">
              <h2>Name</h2>
              <input
                required
                onChange={handleInputChange}
                type="text"
                placeholder="Title"
                name="name"
              />
            </div>
            <div className="input">
              <h2>Email</h2>
              <input
                required
                value={email}
                type="email"
                disabled
                name="email"
              />
            </div>
            <div className="input">
              <h2>Subject</h2>
              <input
                required
                onChange={handleInputChange}
                type="text"
                placeholder="What is this email about?"
                name="subject"
              />
            </div>
            <div className="input">
              <h2>Message</h2>
              <textarea
                required
                onChange={handleInputChange}
                rows={6}
                placeholder="Enter Message"
                type="text"
                name="message"
              />
            </div>
            <div className="buttons">
              <button
                className="cancel"
                type="button"
                onClick={() => onCancel(false)}
              >
                Cancel
              </button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
