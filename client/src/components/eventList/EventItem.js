import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Moment from "react-moment";

const EventItem = ({ friend: { name, dateOfEvent, eventName } }) => {
  return (
    <div>
      <div>{name}</div>
      <div>
        {/* <Moment format="YYYY/MM/DD">{dateOfEvent}</Moment> */}
      </div>
      <div>{eventName}</div>
    </div>
  );
};

EventItem.propTypes = {
  friend: PropTypes.object.isRequired,
};

export default connect(null)(EventItem);
