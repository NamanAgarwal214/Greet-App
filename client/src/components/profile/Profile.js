import React, { useState } from 'react'
import userImg from '../../assets/default.png'

export default function Profile() {
	const [profileView, setProfileView] = useState(true)
	const [updateprofileView, setUpdateProfileView] = useState(false)
	const [passwordView, setPasswordView] = useState(false)
	const [photoView, setPhotoView] = useState(false)

	return (
		<>
			<main class="main">
				<div class="user-view">
					<nav class="user-view__menu">
						<ul class="side-nav">
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
									setPasswordView(true)
									setPhotoView(false)
									setUpdateProfileView(false)
									setProfileView(false)
								}}>
								Update Password
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
					<div class="user-view__content">
						<div class="user-view__form-container">
              {profileView && <></>}
							{updateprofileView && (
								<>
									<h2 class="heading-secondary ma-bt-md">Your account settings</h2>
									<form class="form form-user-data">
										<div class="form__group">
											<label class="form__label" for="name">
												Name
											</label>
											<input class="form__input" id="name" type="text" value="User" required="required" />
										</div>
										<div class="form__group ma-bt-md">
											<label class="form__label" for="email">
												Email address
											</label>
											<input class="form__input" id="email" type="email" value="user@example.com" required="required" />
										</div>
									</form>
								</>
							)}
							{photoView && (
								<>
									<form>
										<div class="form__group form__photo-upload">
											<img class="form__user-photo" src={userImg} alt="User" />
											<a class="btn-text" href="/">
												Choose new photo
											</a>
										</div>
										<div class="form__group right">
											<button class="btn btn--small btn--green">Save settings</button>
										</div>
									</form>
								</>
							)}
							{passwordView && (
								<>
									<h2 class="heading-secondary ma-bt-md">Password change</h2>
									<form class="form form-user-settings">
										<div class="form__group">
											<label class="form__label" for="password-current">
												Current password
											</label>
											<input class="form__input" id="password-current" type="password" placeholder="••••••••" required="required" minlength="8" />
										</div>
										<div class="form__group">
											<label class="form__label" for="password">
												New password
											</label>
											<input class="form__input" id="password" type="password" placeholder="••••••••" required="required" minlength="8" />
										</div>
										<div class="form__group ma-bt-lg">
											<label class="form__label" for="password-confirm">
												Confirm password
											</label>
											<input class="form__input" id="password-confirm" type="password" placeholder="••••••••" required="required" minlength="8" />
										</div>
										<div class="form__group right">
											<button class="btn btn--small btn--green">Save password</button>
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
