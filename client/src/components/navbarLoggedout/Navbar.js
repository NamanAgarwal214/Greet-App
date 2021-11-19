import React from 'react'
import logo from '../../assets/logo1.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<div className="header">
			<nav className="nav">
				<h1>
					<Link className="header__logo" to="/">
						<img className="" src={logo} alt="logo" />
					</Link>
				</h1>
			</nav>
      <div className="nav--user">
					<Link to="/signup" className="nav__el">
						Sign Up
					</Link>
					<Link to="/login" className="nav__el">
						Login
					</Link>
				</div>
		</div>
	)
}
