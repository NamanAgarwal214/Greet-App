import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StateContext } from "../context/Context";

const IsUserRedirect = ({ children, internal }) => {
  const appState = useContext(StateContext);
  if (internal)
    return <>{appState.loggedIn ? children : <Navigate to="/" replace />}</>;
  return <>{!appState.loggedIn ? children : <Navigate to="/" replace />}</>;
};

export default IsUserRedirect;
