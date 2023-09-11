import React, { useContext } from "react";
import HomeLoggedOut from "../components/home-LoggedOut/HomeLoggedOut";
import HomeLoggedIn from "../components/home-LoggedIn/HomeLoggedIn";
import { StateContext } from "../context/Context";

const Home = () => {
  const appState = useContext(StateContext);
  return <>{!appState.loggedIn ? <HomeLoggedOut /> : <HomeLoggedIn />}</>;
};

export default Home;
