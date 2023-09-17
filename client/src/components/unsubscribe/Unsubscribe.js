import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DispatchContext, StateContext } from "../../context/Context";

const Unsubscribe = () => {
  const [loading, setLoading] = useState(true);
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const unsubscribe = async () => {
    try {
      const res = await axios.get("/api/user/unsubscribe", {
        headers: {
          Authorization: `Bearer ${appState.token}`,
        },
      });
      if (res.data.status === "success") {
        appDispatch({
          type: "flashMessage",
          value: "Unsubscribed successfully!",
          status: true,
        });
        setLoading(false);
        setTimeout(() => {
          window.close();
        }, 2000);
      } else {
        appDispatch({
          type: "flashMessage",
          value: res.data.message,
          status: false,
        });
      }
    } catch (error) {
      appDispatch({
        type: "flashMessage",
        value: "Something went wrong",
        status: false,
      });
    }
  };

  useEffect(() => {
    unsubscribe();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>Window will close automatically</div>
  );
};

export default Unsubscribe;
