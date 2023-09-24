import React, { useContext, useEffect, useState } from "react";
import HomeLoggedOut from "../components/home-LoggedOut/HomeLoggedOut";
import HomeLoggedIn from "../components/home-LoggedIn/HomeLoggedIn";
import { DispatchContext, StateContext } from "../context/Context";
import { useNavigate, useParams } from "react-router";
import getUser from "../helpers/getUser";
import Loader from "../components/loader/Loader";

const Home = () => {
  const { token } = useParams();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const [loading, setLoading] = useState(Boolean(token));
  const navigate = useNavigate();

  useEffect(() => {
    if (Boolean(token)) {
      getUser(token).then((user) => {
        console.log(user);
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
        <Loader width={220} height={220} />
      ) : (
        <HomeLoggedIn />
      )}
    </>
  );
};

export default Home;
