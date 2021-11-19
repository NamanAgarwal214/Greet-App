import React from 'react'
import { Link } from 'react-router-dom'
import userImg from '../../assets/default.png'

export default function Profile() {
	return (
		<>
			<main class="main">
				<div class="user-view">
					<nav class="user-view__menu">
						<ul class="side-nav">
							<li>
								<Link to="/">
									Profile
								</Link>
							</li>
              <li>
								<Link to="/">
									Update Profile
								</Link>
							</li>
							<li>
								<Link to="/">
									Update Password
								</Link>
							</li>
							<li>
								<Link to="/">
									Upload Image
								</Link>
							</li>
						</ul>
					</nav>
					<div class="user-view__content">
						<div class="user-view__form-container">
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
								<div class="form__group form__photo-upload">
									<img class="form__user-photo" src={userImg} alt="User" />
									<a class="btn-text" href="">
										Choose new photo
									</a>
								</div>
								<div class="form__group right">
									<button class="btn btn--small btn--green">Save settings</button>
								</div>
							</form>
						</div>
						<div class="line">&nbsp;</div>
						<div class="user-view__form-container">
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
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
