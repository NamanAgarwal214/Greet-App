import React, {useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {loginAction, authFail} from '../../redux/actions/authActions'
import {flashMessage} from '../../redux/actions/flashMessage'

export default function LoginForm({setForgotPassword}) {
  const history = useHistory()
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

  const handleSubmit = async e => {
		e.preventDefault()

		try {
			const res = await axios.post('/api/user/login', { email, password })
      if(!email || !password) {
        dispatch(flashMessage({success: false, message: 'Please fill the form completely!'}))
      }
			else if(res.data && res.data.status === 'success') {
        dispatch(flashMessage({success: true, message: 'You logged in successfully!'}))
        dispatch(loginAction(res.data))
        // console.log(res.data)

        history.push('/')
        
      } else{
        dispatch(flashMessage({success: false, message: 'Incorrect Email or Password!'}))
        console.log('Incorrect Email or Password!');
      }
		} catch (e) {
      dispatch(authFail())
      console.log('There was an error')
		}
	}

  const handleForgotPassword = async e => {
		e.preventDefault()

		try {
			const res = await axios.post('/api/user/forgotpassword', { email })
      if(!email){
        dispatch(flashMessage({success: false, message: 'Please enter your !'}))
      }
			else if(res.data && res.data.status === 'success') {
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

  return (
    <div className="d-flex row g-0 mt-4">
				<div className="form_details col">
					<a href="http://localhost:8000/auth/google"><button className="btn">
						Sign in with
						<img src="https://cdn-icons-png.flaticon.com/128/2875/2875331.png" alt="google_logo" className="img-fluid" />
					</button></a>
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
					</form>
				</div>
			</div>
  )
}
