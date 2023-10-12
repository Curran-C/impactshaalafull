import { Navigate, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "./ResetPassword.scss";
import { useState } from "react";

function ResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!token) return <Navigate to="/" replace />;

  const handleInputChange = (e) => {
    setPasswordError(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    setLoading(true);
    setPasswordError(false);
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      return setPasswordError("Passwords don't match");
    }
    if (formData.newPassword.length < 8) {
      return setPasswordError("Passwords must be longer that 8 characters");
    }
    console.log(formData);
  };

  return (
    <div className="reset-password-page">
      <Navbar />
      <Header />
      <form className="reset-password" onSubmit={handleOnSubmit}>
        <h3>Reset password</h3>
        <div className="input">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <label>Confirm New Password</label>
          <input
            required
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleInputChange}
          />
        </div>
        {passwordError && <span className="text-danger">{passwordError}</span>}

        <div className="buttons">
          <button type="reset" className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {!loading ? "Submit" : "Submitting..."}
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default ResetPassword;
