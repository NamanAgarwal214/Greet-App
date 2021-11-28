import React from 'react'
import Navbar from '../navbar/Navbar'
import illus from '../../assets/2.png'

export default function HomeLoggedIn() {
  return (
    <>
      <Navbar />
      <div className = "landing-main">
      <div className="row m-0">
					<div className="col-12 col-lg-5 col-md-5 col-sm-5 mt-5">
            <h1>Lorem ipsum dolor sit.</h1>
						<h6>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi hic itaque ut perferendis quia quos eius amet ea voluptatum quam!</h6>
            {/* <Link className="btn" to="/login">Get Started</Link> */}
					</div>
					<div className="col-12 col-lg-7 col-md-7 col-sm-7 mt-4">
            <img className="img-fluid" src={illus} alt="" />
					</div>
				</div>
      </div>
      {/* <Profile /> */}
      <div>
        <h1>Your Friends</h1>
      </div>
    </>
  )
}
