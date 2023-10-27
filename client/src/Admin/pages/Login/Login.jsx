import { useState } from "react";
import { loginimg } from "../adminLogin";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

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
    if (admin.username === "admin" && admin.password === "admin")
      navigate("/admin/dashboard");
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
