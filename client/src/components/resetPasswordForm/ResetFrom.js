import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DispatchContext } from "../../context/Context";
import Loader from "../loader/Loader";

export default function ResetFrom() {
  const appDispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!token || !newPassword) {
      appDispatch({
        type: "flashMessage",
        value: "Please enter all details",
        status: false,
      });
      return;
    }
    try {
      setLoading(true);
      const res = await axios.patch("/api/auth/resetPassword", {
        token,
        password: newPassword,
      });

      if (res.data.status === "success") {
        appDispatch({
          type: "flashMessage",
          value: "Your password was reseted successfully!",
          status: true,
        });
        appDispatch({
          type: "login",
          token: res.data.token,
          user: res.data.user,
        });
        setLoading(false);
        navigate("/");
      } else {
        appDispatch({
          type: "flashMessage",
          value: res.data.message,
          status: false,
        });
        return;
      }
    } catch (e) {
      appDispatch({
        type: "flashMessage",
        value: "Something went wrong",
        status: false,
      });
      return;
    }
  };

  return (
    <div className="d-flex flex-row row g-0">
      <div className="form_details col">
        <p className="separate">Reset Password</p>
        <form className="login-form" action="">
          <div className="form__group">
            <label htmlFor="token" className="form__label">
              Reset Token sent to your mail
            </label>
            <input
              onChange={(e) => setToken(e.target.value)}
              id="token"
              type="text"
              required
              autoComplete="off"
              className="form__input"
            />
          </div>
          <div className="form__group">
            <label htmlFor="newPassword" className="form__label">
              Password
            </label>
            <input
              onChange={(e) => setNewpassword(e.target.value)}
              type="password"
              placeholder="New Password"
              className="form__input"
              id="newPassword"
              required
              minLength="8"
            />
          </div>
          <button className="btn" onClick={handleResetPassword}>
            {loading ? <Loader width={35} height={35} /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
