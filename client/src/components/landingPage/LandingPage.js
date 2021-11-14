import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../assets/logo1.png'
import illus from '../../assets/2.png' 

export default function LandingPage() {
	return (
		<>
			<div className="landing-main">  
        <div className="landing-header d-flex align-items-center">
          <img src={logo} className="img-fluid" alt="" />
					<h1>Greetings</h1>
        </div>
				<div className="row m-0">
					<div className="col-12 col-lg-5 col-md-5 col-sm-5">
            <h1>Lorem ipsum dolor sit.</h1>
						<h6>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi hic itaque ut perferendis quia quos eius amet ea voluptatum quam!</h6>
            <Link className="btn" to="/register">Get Started</Link>
					</div>
					<div className="col-12 col-lg-7 col-md-7 col-sm-7">
            <img className="img-fluid" src={illus} alt="" />
					</div>
				</div>
			</div>
		</>
	)
}
