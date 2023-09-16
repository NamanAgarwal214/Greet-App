import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../context/Context";

const LoginForm = ({ setForgotPassword }) => {
  const appDispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      appDispatch({
        type: "flashMessage",
        value: "Please fill the form completely!",
        status: false,
      });
    }
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res.data && res.data.token) {
        console.log(res.data);
        appDispatch({
          type: "flashMessage",
          value: "You logged in successfully!",
          status: true,
        });
        appDispatch({
          type: "login",
          token: res.data.token,
          user: res.data.user,
        });
        navigate.push("/");
      } else {
        appDispatch({
          type: "flashMessage",
          value: "Incorrect Email or Password!",
          status: false,
        });
        console.log(res.data);
      }
    } catch (e) {
      console.log("There was an error");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/user/forgotpassword", { email });
      if (!email) {
        appDispatch({
          type: "flashMessage",
          value: "Please enter your email!",
          status: false,
        });
      } else if (res.data && res.data.status === "success") {
        setForgotPassword(true);
        appDispatch({
          type: "flashMessage",
          value: "A mail has been sent to you with a token!",
          status: true,
        });
        console.log(res.data);
      } else {
        appDispatch({
          type: "flashMessage",
          value: "This email is not registered with us!",
          status: false,
        });
      }
    } catch (e) {
      console.log("There was an error");
    }
  };

  return (
    <div className="d-flex row g-0 mt-4">
      <div className="form_details col">
        <a href={`${process.env.REACT_APP_DEV_BASE_URL}/api/auth/google`}>
          <button className="btn">
            Sign in with
            <img
              src="https://cdn-icons-png.flaticon.com/128/2875/2875331.png"
              alt="google_logo"
              className="img-fluid"
            />
          </button>
        </a>
        <p className="separate">Sign in with Email</p>
        <form className="login-form" action="">
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="form__input"
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="form__input"
              id="password"
              required
              minLength="8"
            />
          </div>
          <div className="right_span">
            <span onClick={handleForgotPassword}>forgot password?</span>
          </div>
          <br />
          <button className="btn" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
