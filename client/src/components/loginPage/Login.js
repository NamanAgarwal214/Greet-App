import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Login = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  // const config = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  //   }
  // };

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const res = await axios.post('http://localhost:8000/api/user/login', { email, password })
			if(res.data) {
        console.log(res.data)
      } else{
        console.log('Invalid Email or Password')
      }
		} catch (e) {
      console.log('There was an error')
		}
	}

	return (
		<>
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
							<span>forgot password?</span>
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
		</>
	)
}

export default Login
