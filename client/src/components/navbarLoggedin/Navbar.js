import React from 'react'
import logo from '../../assets/logo1.png'
import { Link } from 'react-router-dom'
import userimg from '../../assets/default.png'
import { logoutAction } from '../../redux/actions/authActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Navbar = ({logoutAction}) => {
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
					<Link to="/login" onClick = {logoutAction} className="nav__el">
						<img src={userimg} alt="User" class="nav__user-img" />
						<span>Logout</span>
					</Link>
				</div>
		</div>
	)
}

Navbar.propTypes = {
  logoutAction: PropTypes.func.isRequired,
}

export default connect(null, {logoutAction})(Navbar)