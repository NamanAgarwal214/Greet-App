import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DispatchContext } from "../../context/Context";
import { StateContext } from "../../context/Context";
import axios from "axios";

const Navbar = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const logoutHandler = async () => {
    const res = await axios.get("/api/auth/logout", {
      headers: {
        Authorization: `Bearer ${appState.token}`,
      },
    });
    if (res.data.status === "success") {
      appDispatch({
        type: "flashMessage",
        value: "Logged out successfully!",
        status: true,
      });
      appDispatch({ type: "logout" });
    } else {
      appDispatch({
        type: "flashMessage",
        value: res.data.message,
        status: false,
      });
    }
  };
  return (
    <div className="header">
      <nav className="nav nav--tour navbar">
        <h1>
          <Link className="header__logo" to="/">
            <img className="" src="/images/misc/logo.png" alt="logo" />
          </Link>
          {/* <span>Greetings</span> */}
        </h1>
      </nav>

      {appState.loggedIn ? (
        <div className="nav--user">
          <Link to="/profile" className="nav__el">
            <img
              src={
                appState.user.photo
                  ? appState.user.photo
                  : "/images/misc/default.png"
              }
              alt="User"
              className="nav__user-img"
            />
            <span>{appState.user.username}</span>
          </Link>
          <Link to="/login" onClick={logoutHandler} className="nav__el">
            {/* <img src={userimg} alt="User" className="nav__user-img" /> */}
            <span className="mb-2">Logout</span>
          </Link>
        </div>
      ) : (
        <div className="nav--user">
          <Link to="/register" className="nav__el">
            Sign Up
          </Link>
          <Link to="/login" className="nav__el">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
