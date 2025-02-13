import React, { useContext } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FlashMessage from "./components/flashMessage/FlashMessage";
import CreateEvent from "./components/createEvent/CreateEvent";
import EventList from "./components/eventList/EventList";
import IsUserRedirect from "./helpers/routes";
import ProfilePage from "./pages/Profile";
import { StateContext } from "./context/Context";
import Unsubscribe from "./components/unsubscribe/Unsubscribe";
axios.defaults.baseURL = process.env.REACT_APP_PROD_BASE_URL;

function App() {
  const state = useContext(StateContext);

  return (
    <>
      <FlashMessage flashMessages={state.flashMessages} />
      <Routes>
        <Route exact path="/view-events" element={<EventList />} />
        <Route exact path="/create-event" element={<CreateEvent />} />
        <Route
          path="/login"
          element={
            <IsUserRedirect>
              <Login />
            </IsUserRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <IsUserRedirect>
              <Register />
            </IsUserRedirect>
          }
        />
        <Route
          path="/profile"
          element={
            <IsUserRedirect internal={true}>
              <ProfilePage />
            </IsUserRedirect>
          }
        />
        <Route
          path="/email/unsubscribe"
          element={
            <IsUserRedirect internal={true}>
              <Unsubscribe />
            </IsUserRedirect>
          }
        />
        <Route path="/:token?" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
