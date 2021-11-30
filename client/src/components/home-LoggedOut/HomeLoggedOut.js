import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo1.png";
import illus from "../../assets/2.png";

export default function HomeLoggedOut() {
  return (
    <div className="landing-main">
      <div className="landing-header d-flex align-items-center">
        <img src={logo} className="img-fluid" alt="" />
        <h1>Greetings</h1>
      </div>
      <div className="row m-0">
        <div className="col-12 col-lg-5 col-md-5 col-sm-5">
          <h1>Feels headache to remember special dates?</h1>
          <h6>
            We have the solution. Save the events one time and feel free for
            lifetime. <br />
            Still here? Join now….
          </h6>
          <Link className="btn" to="/login">
            Get Started
          </Link>
        </div>
        <div className="col-12 col-lg-7 col-md-7 col-sm-7">
          <img className="img-fluid" src={illus} alt="" />
        </div>
      </div>
    </div>
  );
}
