import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import ArrowCircle from "../Assets/ArrowCircle.svg";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const isFormValid = form.email && form.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.message || "Login failed");
    }
  };

  return (
    <div className="RegisterParent">
      <div className="registeruserform">
        <form onSubmit={handleSubmit} className="registermainform">
          <h2 className="letsonboard">Login</h2>
          <label htmlFor="" className="registerformlbls">
            {" "}
            Enter Your Email-Id 👇🏻:
          </label>
          <input
            placeholder="Email"
            className="registerinputfields"
            type="email"
            style={{ width: "auto" }}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <label htmlFor="" className="registerformlbls">
            {" "}
            Enter Password Of Your Account👇🏻:
          </label>
          <input
            type="password"
            className="registerinputfields"
            placeholder="Password"
            style={{ width: "auto" }}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />{" "}
          <br />
          <button
            type="submit"
            style={{ width: "auto" }}
            className={`registerbtn ${!isFormValid ? "disabled-btn" : ""}`}
            disabled={!isFormValid}
          >
            Login
            <img src={ArrowCircle} className="arrow-icon" alt="" />
          </button>
          {/* <Link to="/register">Don't Have Account?</Link> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
