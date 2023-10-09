import "./ForgotPasswordPopup.scss";

import Modal from "../Modal/Modal";
import { useState } from "react";

function ForgotPasswordPopup({ showPopup }) {
  const [email, setEmail] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    showPopup(false);
  };

  return (
    <Modal>
      <h4 className="modal-title">Forgot Password?</h4>
      <div className="forgot-password modal-body">
        <input
          type="email"
          required
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="accountRec"
        />
      </div>
      <div className="modal-footer">
        <button
          type="reset"
          className="cancel-button"
          onClick={() => showPopup(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="submit-button"
          onClick={handleOnSubmit}
        >
          Sent Email
        </button>
      </div>
    </Modal>
  );
}

export default ForgotPasswordPopup;
