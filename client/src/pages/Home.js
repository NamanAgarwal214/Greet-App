import React, { useContext, useEffect, useState } from "react";
import HomeLoggedOut from "../components/home-LoggedOut/HomeLoggedOut";
import HomeLoggedIn from "../components/home-LoggedIn/HomeLoggedIn";
import { DispatchContext, StateContext } from "../context/Context";
import { useNavigate, useParams } from "react-router";
import getUser from "../helpers/getUser";

const Home = () => {
  const { token } = useParams();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [loading, setLoading] = useState(Boolean(token));
  const navigate = useNavigate();

  useEffect(() => {
    if (Boolean(token)) {
      getUser(token).then((user) => {
        setLoading(!loading);
        appDispatch({
          type: "login",
          token,
          user,
        });
        appDispatch({
          type: "flashMessage",
          value: "You logged in successfully!",
          status: true,
        });
      });
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!appState.loggedIn ? (
        <HomeLoggedOut />
      ) : loading ? (
        <p>loading</p>
      ) : (
        <HomeLoggedIn />
      )}
    </>
  );
};

export default Home;
