import React, {useState, Fragment} from 'react'


const CreateEvent = () => {
	const [displaySocialLinks, toggleSocialLinks] = useState(false);
	return (
		<div className = "contain">
		<h1 className="large">
			Create Your Event
		</h1>
	  <p className="lead">
		<i className="fa fa-user"></i> Let's get some information to set your event.
	  </p>
	  <form className="form">
		<div className="form-group">
		  <small className="form-text">Name of Friend</small>
		  <input type="text" placeholder="Name" name="name" className = "inputField"/>
		</div>
		<div className="form-group">
		  <small className="form-text">Date of event</small>
		  <input type="date" name="date" className = "inputField"/>
		</div>
		<div className="form-group">
			<small className="form-text">Event Name</small>
		  <input type="text" placeholder="Birthday, anniversary, etc." name="event" className = "inputField"/>
		</div>
		<div className="my-2">
		  <button onClick = {() => toggleSocialLinks(!displaySocialLinks)} type="button" className = "btn-1">
			Add Additional information
		  </button>
		</div>
		{displaySocialLinks && <Fragment>
				<div className="form-group">
		  <small className="form-text">Tell us more about Event</small>
		  <textarea placeholder="..." rows = '5' cols = '50' name="bio"></textarea>
		</div>   
			</Fragment>}
		</form>
		</div>
	)
}

export default CreateEvent
