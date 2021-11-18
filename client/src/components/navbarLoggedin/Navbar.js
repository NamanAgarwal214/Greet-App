import React from 'react'
import logo from '../../assets/logo1.png'
import { Link } from 'react-router-dom'
import userimg from '../../assets/default.png'

export default function Navbar() {
	return (
		<div className="header">
			<nav className="nav nav--tour navbar">
				<h1>
					<Link className="header__logo" to="/">
						<img className="" src={logo} alt="logo" />
					</Link>
				</h1>
			</nav>
      <div className="nav--user">
					<Link to="/me" className="nav__el">
						<img src={userimg} alt="User" class="nav__user-img" />
						<span>User</span>
					</Link>
				</div>
		</div>
	)
}
