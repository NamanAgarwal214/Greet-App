import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import DispatchContext from '../../context/DispatchContext'

export default function RegisterForm() {
	const history = useHistory()
  const appDispatch = useContext(DispatchContext)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
    if(!email || !name || !password){
      appDispatch({type: 'flashMessage', value: 'Please fill the form completely!', status: false})
    }
			try {
				const res = await axios.post('/api/user/register', { name, email, password })
        appDispatch({type: 'flashMessage', value: 'You signed in successfully!', status: true})
        appDispatch({type: 'login', data: res.data.token})
				history.push('/')
			} catch (err) {
        appDispatch({type: 'flashMessage', value: 'There was an error!', status: false})
        console.log(err.message)
			}
	}

	return (
		<>
			<div className="d-flex row g-0">
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
						<br />
						<button className="btn" onClick={handleSubmit}>
							Register
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
