import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import {loginAction} from '../../redux/actions/authActions'
import {flashMessage} from '../../redux/actions/flashMessage'

export default function ResetFrom() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [token, setToken] = useState('')
  const [newPassword, setNewpassword] = useState('')

  const handleResetPassword = async e => {
		e.preventDefault()

		try {
			const res = await axios.post('/api/user/resetPassword', { token, password: newPassword })
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
		<div className="d-flex flex-row row g-0">
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
						<input onChange={e => setNewpassword(e.target.value)} type="password" placeholder="New Password" className="form__input" id="newPassword" required minLength="8" />
					</div>
					<button className="btn" onClick={handleResetPassword}>
						Reset Password
					</button>
				</form>
			</div>
		</div>
	)
}
