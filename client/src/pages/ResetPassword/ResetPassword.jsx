import { Navigate, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "./ResetPassword.scss";

function ResetPassword() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  if (!token) return <Navigate to="/" replace />;

  return (
    <div className="reset-password-page">
      <Navbar />
      <Header />
      <form className="reset-password">
        <h3>Reset password</h3>
      </form>
      <Footer />
    </div>
  );
}

export default ResetPassword;
