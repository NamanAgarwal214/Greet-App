import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/auth';
import PropTypes from 'prop-types'

const Login = ({login}) => {

	const [logData, setLogData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = logData;

    const change = e => setLogData({ 
        ...logData, [e.target.name]: e.target.value 
    });

    const submit = async e => {
        e.preventDefault();
        login({email, password});
    }

	return <Fragment>
		<div className="row gx-0">
        <div className="col cols detail col-lg-5 col-md-6 col-sm-6">
            <div className="mx-5 my-4 p-3 main">
                <h1 className="mb-3 h1">Login</h1>
                <p className="tagline">Lorem ipsum dolor sit amet</p>
            </div>
            
            <form className="d-flex">
                <button type="submit" className="btnG border border-1 m-auto rounded-pill p-4">
                    <i className="fa fa-google fa-2x"></i>
                    <h2 className = "h2">Sign in with Google</h2>
                </button>
            </form>
            <p className="separate">or Sign in with Email</p>
           <form className="contain" onSubmit = {e => submit(e)}>
                    <div className="mb-3 mx-auto">
                        <label for="exampleFormControlInput1" className="form-label">Email address*</label>
                        <input type="email" className="rounded-pill input form-control" id="exampleFormControlInput1" placeholder="name@example.com" name = "email" value = {email} onChange = {e => change(e)} required />
                    </div>
                    <div className="mb-3 mx-auto">
                        <label for="exampleFormControlInput2" className="form-label">Password*</label>
                        <input type="password" className="rounded-pill input form-control" id="exampleFormControlInput2" name = "password" value = {password} onChange = {e => change(e)} required />
                        <a className = "pass" href="">forgot password?</a>
                    </div>
                </form>
                <form className="d-flex">
                    <button type="submit" className="btn-log border border-2 m-auto rounded-pill p-4">
                        <h2 className = "h2">Login</h2>
                    </button>
                </form>
                <p className="my-4 mx-4 last">
                    Not registered yet? <Link to = "/register"><a className="signup">Sign Up</a></Link>
                </p>
        </div>
        <div className="col cols col-lg-7 col-md-6 col-sm-6">
            <img src="https://images.unsplash.com/photo-1563089145-599997674d42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80" alt="side_img" className="img img-fluid" />
        </div>
    </div>
	</Fragment>	
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default connect(null, {login})(Login)