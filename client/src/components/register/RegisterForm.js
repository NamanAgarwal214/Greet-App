import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../context/Context";

const RegisterForm = () => {
  const navigate = useNavigate();
  const appDispatch = useContext(DispatchContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !password) {
      appDispatch({
        type: "flashMessage",
        value: "Please fill the form completely!",
        status: false,
      });
    }
    try {
      // const data = new FormData();
      // data.append("name", name);
      // data.append("email", email);
      // data.append("password", password);

      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.status === "success") {
        appDispatch({
          type: "flashMessage",
          value: "Signed in successfully!",
          status: true,
        });
        appDispatch({
          type: "register",
          token: res.data.token,
          user: res.data.user,
        });
        navigate("/");
      } else {
        console.log(res.data.message);
        appDispatch({
          type: "flashMessage",
          value: res.data.message,
          status: false,
        });
        window.location.reload();
      }
    } catch (err) {
      appDispatch({
        type: "flashMessage",
        value: "There was an error!",
        status: false,
      });
      window.location.reload();
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="d-flex row g-0">
        <div className="form_details col">
          <a href={`${process.env.REACT_APP_PROD_BASE_URL}/api/auth/google`}>
            <button className="btn">
              Sign in with
              <img
                src="https://cdn-icons-png.flaticon.com/128/2875/2875331.png"
                alt="google_logo"
                className="img-fluid"
              />
            </button>
          </a>

          <p className="separate">Sign up with Email</p>
          <form className="login-form" action="">
            <div className="form__group form_item">
              <label htmlFor="username" className="form__label">
                Username
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                id="username"
                type="text"
                placeholder="Username"
                required
                className="form__input reg"
              />
            </div>
            <div className="form__group form_item">
              <label htmlFor="email" className="form__label">
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="form__input reg"
              />
            </div>
            <div className="form__group form_item">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="form__input reg"
                id="password"
                required
                minLength="8"
              />
            </div>
            <br />
            <button className="btn" onClick={handleSubmit}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
