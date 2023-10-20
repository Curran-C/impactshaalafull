import "./ForgotPasswordPopup.scss";

import Modal from "../Modal/Modal";
import { useState } from "react";
import { forgotPasswordAPI } from "../../api/company";
import { toast } from "react-toastify";

function ForgotPasswordPopup({ showPopup }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      setLoading(true);
      const res = await forgotPasswordAPI({ email });
      toast.success(res);
      showPopup(false);
    } catch (error) {
      console.log("Error in forgot password : ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <h4 className="modal-title">Forgot Password?</h4>
      <div className="forgot-password modal-body">
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="accountRec"
        />
      </div>
      {error?.message && <p className="text-danger">{error?.message}</p>}
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
          disabled={
            loading ||
            !email?.trim() ||
            !email?.includes("@") ||
            !email?.includes(".")
          }
        >
          {!loading ? "Send mail" : "Sending mail..."}
        </button>
      </div>
    </Modal>
  );
}

export default ForgotPasswordPopup;
