import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DispatchContext, StateContext } from "../../context/Context";
import Loader from "../loader/Loader";

export default function CreateEvent() {
  const navigate = useNavigate();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dateOfEvent: "",
    event: "",
    desc: "",
  });

  const { name, dateOfEvent, event, desc } = formData;

  const change = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const token = appState.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (!name || !dateOfEvent || !event) {
      appDispatch({
        type: "flashMessage",
        value: "Please fill the form completely!",
        status: false,
      });
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/friend",
        { name, dateOfEvent, event, desc },
        config
      );

      if (res.data.status === "success") {
        appDispatch({
          type: "flashMessage",
          value: "Event added successfully!",
          status: true,
        });
        setLoading(false);
        navigate("/");
      } else {
        appDispatch({
          type: "flashMessage",
          value: res.data.message,
          status: false,
        });
        setLoading(false);
        return;
      }
    } catch (err) {
      appDispatch({
        type: "flashMessage",
        value: "There was an error!",
        status: false,
      });
      return;
    }
  };

  const minDate = () => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  };

  return (
    <>
      <Link className="" to="/">
        <img className="logo_create" src="/images/misc/logo.png" alt="logo" />
      </Link>
      <div className="contain">
        <h1 className="large">Create Your Event</h1>
        <p className="lead">
          <i className="fa fa-user"></i> Let's get some information to set your
          event.
        </p>
        <form className="form" onSubmit={(e) => submit(e)}>
          <div className="form-group">
            <small className="form-text">Name of Friend</small>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => change(e)}
              className="inputField"
            />
          </div>
          <div className="form-group">
            <small className="form-text">Date of event</small>
            <input
              type="date"
              name="dateOfEvent"
              className="inputField"
              value={dateOfEvent}
              min={minDate()}
              onChange={(e) => change(e)}
            />
          </div>
          <div className="form-group">
            <small className="form-text">Event Name</small>
            <input
              type="text"
              placeholder="Birthday, anniversary, etc."
              name="event"
              value={event}
              onChange={(e) => change(e)}
              className="inputField"
            />
          </div>
          <div className="my-2">
            <button
              onClick={() => setDisplay(!display)}
              type="button"
              className="btn-1"
            >
              Add Additional information
            </button>
            {display && (
              <>
                <div className="form-group">
                  <small className="form-text">Tell us more about Event</small>
                  <textarea
                    placeholder="..."
                    rows="5"
                    cols="50"
                    value={desc}
                    onChange={(e) => change(e)}
                    maxLength={100}
                    name="desc"
                  ></textarea>
                </div>
              </>
            )}
            <button onClick={(e) => submit(e)} type="button" className="btn-1">
              {loading ? <Loader width={35} height={35} /> : "CREATE"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// CreateEvent.propTypes = {
//   addEvent: PropTypes.func.isRequired,
// };
