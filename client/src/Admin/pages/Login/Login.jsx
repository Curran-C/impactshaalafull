import { useState } from "react";
import { loginimg } from "../adminLogin";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import Cookies from "js-cookie";

const Login = () => {
  // states
  const [admin, setAdmin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    console.log(admin);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (admin.username === "admin" && admin.password === "admin") {
      Cookies.set(
        "accessToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJfaWQiOiJzb21ldGhpbmcgc3RhdGljLm5vIGJhY2tlbmQgZm9yIG5vdyJ9.5RTs2FEd_fUGu1sQocoVUbk35RUWSq6HuioOH6XgbQc"
      );
      localStorage.setItem(
        "IsAdmin",
        JSON.stringify({ username: admin.username })
      );
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="adminLogin">
      <img src={loginimg} alt="" />
      <form onSubmit={handleLogin} className="inputs">
        <h1>Login</h1>
        <div className="inputsContainer">
          <input
            onChange={handleInputChange}
            className="loginInput"
            placeholder="Username"
            type="text"
            name="username"
          />
          <input
            onChange={handleInputChange}
            className="loginInput"
            placeholder="Password"
            type="password"
            name="password"
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
