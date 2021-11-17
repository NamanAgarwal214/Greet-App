import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerAction, registerFail } from '../../redux/actions/authActions'

export default function Register() {
	const history = useHistory()
	const dispatch = useDispatch()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		if (password !== password2) {
			console.log('Passwords do not match')
		} else {
			try {
				const res = await axios.post('http://localhost:8000/api/user/register', { name, email, password })
				dispatch(registerAction(res.data))

				history.push('/')
				console.log(res.data)
			} catch (err) {
				dispatch(registerFail())
				console.error(err.response.data)
			}
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
					<p className="separate">Sign up with Email</p>
					<form className="login-form" action="">
						<div className="form__group form_item">
							<label htmlFor="username" className="form__label">
								Username
							</label>
							<input onChange={e => setName(e.target.value)} id="username" type="text" placeholder="Username" required className="form__input reg" />
						</div>
						<div className="form__group form_item">
							<label htmlFor="email" className="form__label">
								Email address
							</label>
							<input onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="you@example.com" required className="form__input reg" />
						</div>
						<div className="form__group form_item">
							<label htmlFor="password" className="form__label">
								Password
							</label>
							<input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="form__input reg" id="password" required minLength="8" />
						</div>
						<div className="form__group form_item">
							<label htmlFor="password2" className="form__label">
								Confirm Password
							</label>
							<input onChange={e => setPassword2(e.target.value)} type="password" placeholder="Password" className="form__input reg" id="password2" required minLength="8" />
						</div>
						<br />
						<button className="btn register" onClick={handleSubmit}>
							Register
						</button>
						<p className="register_info">
							Already registered? <Link to="/login">Login here</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	)
}
