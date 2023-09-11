import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StateContext } from "../context/Context";

const IsUserRedirect = ({ children }) => {
  const appState = useContext(StateContext);
  return <>{!appState.loggedIn ? children : <Navigate to="/" replace />}</>;
};

export default IsUserRedirect;
