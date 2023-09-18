import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { DispatchContext, StateContext } from "../../context/Context";

const EventList = () => {
  const [occasions, setOccasions] = useState([]);
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const getFriend = async () => {
    try {
      const res = await axios.get("/api/friend/", {
        headers: {
          Authorization: `Bearer ${appState.token}`,
        },
      });
      if (res.data.status === "success") {
        setOccasions(res.data.friends);
      } else {
        appDispatch({
          type: "flashMessage",
          value: res.data.message,
          status: false,
        });
      }
    } catch (err) {
      appDispatch({
        type: "flashMessage",
        value: "Something went wrong",
        status: false,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/friend/${id}`, {
        headers: {
          Authorization: `Bearer ${appState.token}`,
        },
      });
      if (res.data.status === "success") {
        setOccasions(occasions.filter((el) => el._id !== id));
        appDispatch({
          type: "flashMessage",
          value: "Deleted Successfully",
          status: true,
        });
      } else {
        appDispatch({
          type: "flashMessage",
          value: res.data.message,
          status: false,
        });
      }
    } catch (err) {
      appDispatch({
        type: "flashMessage",
        value: "Something went wrong",
        status: false,
      });
    }
  };

  useEffect(
    () => getFriend(), // eslint-disable-next-line
    []
  );

  return occasions.length ? (
    <Fragment>
      <div className="user-view">
        <div className="user-view__content">
          <section className="feature">
            <div className="container">
              <div className="col-md-12">
                <div className="heading text-center wow  slideInUp animated">
                  <h2 className="headcards">Your Friends</h2>
                </div>
              </div>
              <div className="row">
                {occasions.map((occasion) => {
                  return (
                    <div className="col-md-4 col-sm-6" key={occasion._id}>
                      <div className="feature-text text-center  wow  slideInLeft animated">
                        <div>
                          <img
                            className="eventimage rounded-pill"
                            src={`/images/users/${occasion.photo}.png`}
                            alt="photu"
                          ></img>{" "}
                        </div>
                        <h4>{occasion.name}</h4>
                        <Moment format="DD/MM/YYYY">
                          {occasion.dateOfEvent}
                        </Moment>
                        <p>{occasion.event}</p>
                        <button
                          className="dltbtn"
                          onClick={() => handleDelete(occasion._id)}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  ) : (
    <p>No friends added so far</p>
  );
};

export default EventList;
