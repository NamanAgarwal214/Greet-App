import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {loginAction} from '../../redux/actions/authActions'
import {flashMessage} from '../../redux/actions/flashMessage'

const Login = () => {
  const history = useHistory()
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [newPassword, setNewpassword] = useState('')
	const [forgotpassword, setForgotPassword] = useState(false)


	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const res = await axios.post('http://localhost:8000/api/user/login', { email, password })
			if(res.data && res.data.status === 'success') {
        dispatch(flashMessage({success: true, message: 'You logged in successfully!'}))
        dispatch(loginAction(res.data))
        console.log(res.data)

        history.push('/')
        
      } else{
        dispatch(flashMessage({success: false, message: 'Incorrect Email or Password!'}))
        console.log('Incorrect Email or Password!');
      }
		} catch (e) {
      console.log('There was an error')
		}
	}

  const handleForgotPassword = async e => {
		e.preventDefault()

		try {
			const res = await axios.post('http://localhost:8000/api/user/forgotpassword', { email })
			if(res.data && res.data.status === 'success') {
        setForgotPassword(true)
        dispatch(flashMessage({success: true, message: 'A mail has been sent to you with a token!'}))
        console.log(res.data);
      } else{
        dispatch(flashMessage({success: false, message: 'This email is not registered with us!'}))
      }
		} catch (e) {
      console.log('There was an error')
		}
	}

  const handleResetPassword = async e => {
		e.preventDefault()

		try {
			const res = await axios.post('http://localhost:8000/api/user/resetPassword', { token, password: newPassword })
			if(res.data && res.data.status === 'success') {
        dispatch(loginAction(res.data))
        dispatch(flashMessage({success: true, message: 'Your password was reseted!'}))
        console.log(res.data);

        history.push('/')        
        // setForgotPassword(false)
      } else{
        // console.log(res);
        dispatch(flashMessage({success: false, message: 'There was an error!'}))
      }
		} catch (e) {
      console.log('There was an error')
		}
	}

	return (
		(!forgotpassword) ? <>
			<div className="d-flex flex-row row g-0">
				<div className="form_details col">
					<button className="btn">
						Sign in with
						<img src="https://cdn-icons-png.flaticon.com/128/2875/2875331.png" alt="google_logo" className="img-fluid" />
					</button>
					<p className="separate">Sign in with Email</p>
					<form className="login-form" action="">
						<div className="form__group">
							<label htmlFor="email" className="form__label">
								Email address
							</label>
							<input onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="you@example.com" required className="form__input" />
						</div>
						<div className="form__group">
							<label htmlFor="password" className="form__label">
								Password
							</label>
							<input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"
               className="form__input" id="password" required minLength="8" />
						</div>
						<div className="right_span">
							<span onClick={handleForgotPassword}>forgot password?</span>
						</div>
						<br />
						<button className="btn" onClick={handleSubmit}>
							Login
						</button>
						<p className="register_info">
							Not registered yet? <Link to="/register">Register here</Link>
						</p>
					</form>
				</div>
			</div>
		</> : <div className="d-flex flex-row row g-0">
				<div className="form_details col">
					<p className="separate">Reset Password</p>
					<form className="login-form" action="">
						<div className="form__group">
							<label htmlFor="token" className="form__label">
								Reset Token sent to your mail
							</label>
							<input onChange={e => setToken(e.target.value)} id="token" type="text" placeholder="you@example.com" required className="form__input" />
						</div>
						<div className="form__group">
							<label htmlFor="newPassword" className="form__label">
								Password
							</label>
							<input onChange={e => setNewpassword(e.target.value)} type="password" placeholder="New Password"
               className="form__input" id="newPassword" required minLength="8" />
						</div>
						<button className="btn" onClick={handleResetPassword}>
							Reset Password
						</button>
					</form>
				</div>
			</div>
	)
}

export default Login
