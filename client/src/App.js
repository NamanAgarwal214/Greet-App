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
// axios.defaults.baseURL = "https://greeting-twro.onrender.com";
axios.defaults.baseURL = "http://localhost:8000";

function App() {
  const state = useContext(StateContext);

  // useEffect(() => {
  //   if (state.token) {
  //     axios
  //       .get("/api/user/getUser", {
  //         headers: {
  //           Authorization: `Bearer ${state.token}`,
  //         },
  //       })
  //       .then((res) => {
  //         state.user = res.data;
  //         localStorage.setItem("GreetAppUsername", state.user.username);
  //         localStorage.setItem("GreetAppEmail", state.user.email);
  //         localStorage.setItem("GreetAppPhoto", state.user.photo);
  //         console.log(res.data);
  //       })
  //       .catch((e) => {
  //         console.log("There was an error");
  //       });
  //   } else {
  //     localStorage.removeItem("GreetAppUsername");
  //     localStorage.removeItem("GreetAppEmail");
  //     localStorage.removeItem("GreetAppPhoto");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.token, state.user]);

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
        <Route path="/profile" exact element={<ProfilePage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
