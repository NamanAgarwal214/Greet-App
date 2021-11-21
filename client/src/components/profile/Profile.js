/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import userImg from '../../assets/default.png'
import { useHistory } from 'react-router-dom'
import { loginAction } from '../../redux/actions/authActions'
import { flashMessage } from '../../redux/actions/flashMessage'

export default function Profile() {
  const user = useSelector(state => state.Auth.user)
  const history = useHistory()
  const dispatch = useDispatch()
	const [profileView, setProfileView] = useState(true)
	const [updateprofileView, setUpdateProfileView] = useState(false)
	const [passwordView, setPasswordView] = useState(false)
	const [photoView, setPhotoView] = useState(false)

	const [newName, setNewName] = useState(user.name)
	const [newEmail, setNewEmail] = useState(user.email)

	const handleProfileSubmit = async e => {
		e.preventDefault()
		try {
      console.log(user);
			const res = await axios.post('/api/user/updateMe', { user: user, name: newName, email: newEmail })
			if(res.data.status === 'success'){
        dispatch(flashMessage({ success: true, message: 'You profile was updated successfully!' }))
        dispatch(loginAction(res.data))
      } else{
        dispatch(flashMessage({ success: false, message: 'There was an error!' }))
      }
		} catch (err) {
			dispatch(flashMessage({ success: false, message: 'There was an error!' }))
			console.log(err.message)
		}
	}
	const handlePhotoSubmit = () => {}

	return (
		<>
			<main className="main">
				<div className="user-view">
					<nav className="user-view__menu">
						<ul className="side-nav">
							<li
								onClick={() => {
									setPasswordView(false)
									setPhotoView(false)
									setUpdateProfileView(false)
									setProfileView(true)
								}}>
								Profile
							</li>
							<li
								onClick={() => {
									setPasswordView(false)
									setPhotoView(false)
									setUpdateProfileView(true)
									setProfileView(false)
								}}>
								Update Profile
							</li>
							<li
								onClick={() => {
									setPasswordView(false)
									setPhotoView(true)
									setUpdateProfileView(false)
									setProfileView(false)
								}}>
								Upload Image
							</li>
						</ul>
					</nav>
					<div className="user-view__content">
						<div className="user-view__form-container">
							{profileView && <></>}
							{updateprofileView && (
								<>
									<h2 className="heading-secondary ma-bt-md">Your account settings</h2>
									<form className="form form-user-data" onSubmit={handleProfileSubmit}>
										<div className="form__group">
											<label className="form__label" htmlFor="name">
												Name
											</label>
											<input onChange={e => setNewName(e.target.value)} className="form__input" id="name" type="text" defaultValue={user.name} required="required" />
										</div>
										<div className="form__group ma-bt-md">
											<label className="form__label" htmlFor="email">
												Email address
											</label>
											<input onChange={e => setNewEmail(e.target.value)} className="form__input" id="email" type="email" defaultValue={user.email} required="required" />
										</div>
										<div className="form__group right">
											<button className="btn btn--small btn--green">Save Changes</button>
										</div>
									</form>
								</>
							)}
							{photoView && (
								<>
									<form onSubmit={handlePhotoSubmit}>
										<div className="form__group form__photo-upload">
											<img className="form__user-photo" src={userImg} alt="User" />
											<a className="btn-text" href="/">
												Choose new photo
											</a>
										</div>
										<div className="form__group right">
											<button className="btn btn--small btn--green">Update Photo</button>
										</div>
									</form>
								</>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
