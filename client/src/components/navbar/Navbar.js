import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DispatchContext } from "../../context/Context";
import { StateContext } from "../../context/Context";

const Navbar = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const logoutHandler = () => {
    appDispatch({
      type: "flashMessage",
      value: "Logged out successfully!",
      status: true,
    });
    appDispatch({ type: "logout" });
  };
  return (
    <div className="header">
      <nav className="nav nav--tour navbar">
        <h1>
          <Link className="header__logo" to="/">
            <img className="" src="/images/misc/logo.png" alt="logo" />
          </Link>
        </h1>
      </nav>

      {appState.loggedIn ? (
        <div className="nav--user">
          <Link to="/me" className="nav__el">
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
