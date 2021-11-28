import React, { Fragment, useContext, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EventItem from "./EventItem";
import DispatchContext from "../../context/DispatchContext";
import axios from "axios";

export default function EventList() {
  const appDispatch = useContext(DispatchContext);
  useEffect(async () => {
    try {
      const res = await axios.get('/api/friend');
      console.log(res.data); 
    } catch (err) {
      console.log(err)
    }
  }, [])
  return (
    <Fragment>
      <div className="user-view">
        <div className="user-view__content">
          {/* {occasions.map((occasion) => (
            <EventItem key={occasion._id} occasion={occasion} />
          ))} */}
        </div>
      </div>
    </Fragment>
  );
};

EventList.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => ({ event: state.Event });
