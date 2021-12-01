import React from "react";
import Navbar from "../navbar/Navbar";
import illus from "../../assets/2.png";
import EventList from "../eventList/EventList";

export default function HomeLoggedIn() {
  return (
    <>
      <Navbar />
      <div className="landing-main">
        <div className="row m-0">
          <div className="col-12 col-lg-5 col-md-5 col-sm-5 mt-2">
            <h1>Forget to wish your loved ones...</h1>
            <h6>
              Do you forget to wish birthdays and anniversaries to your loved
              ones?
              <br /> Do you feel headache to remember special dates? <br />
              Add events now and enjoy.
              <br />
              Happy Greet!!!
            </h6>
            {/* <Link className="btn" to="/login">Get Started</Link> */}
          </div>
          <div className="col-12 col-lg-7 col-md-7 col-sm-7 mt-4">
            <img className="img-fluid" src={illus} alt="" />
          </div>
        </div>
      </div>
      <EventList />
    </>
  );
}
