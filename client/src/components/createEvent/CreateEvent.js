import React, { useState } from 'react'
import { addEvent } from '../../redux/actions/eventActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const CreateEvent = ({addEvent}) => {
	const [display, setDisplay] = useState(false)
	const [formData, setFormData] = useState({
		person: '',
		date: '',
		eventName: ''
	})

	const {person, date, eventName} = formData;

	const change = e => {
        setFormData({
        ...formData, [e.target.name]: e.target.value 
    });
    }

    const submit = async e => {
        e.preventDefault();
		addEvent({formData});
		setFormData({
			person: '',
			date: new Date(0),
			eventName: ''
		})
    }

	return (
		<div className="contain">
			<h1 className="large">Create Your Event</h1>
			<p className="lead">
				<i className="fa fa-user"></i> Let's get some information to set your event.
			</p>
			<form className="form" onSubmit = {e => submit(e)}>
				<div className="form-group">
					<small className="form-text">Name of Friend</small>
					<input type="text" placeholder="Name" name="person" value = {person} onChange = {e => change(e)} className="inputField" />
				</div>
				<div className="form-group">
					<small className="form-text">Date of event</small>
					<input type="date" name="date" className="inputField" value = {date} onChange = {e => change(e)} />
				</div>
				<div className="form-group">
					<small className="form-text">Event Name</small>
					<input type="text" placeholder="Birthday, anniversary, etc." name="eventName" value = {eventName} onChange = {e => change(e)} className="inputField" />
				</div>
				<div className="my-2">
					<button onClick={() => setDisplay(!display)} type="button" className="btn-1">
						Add Additional information
					</button>
					<button onClick = {e => submit(e)} type="button" className="btn-1">
						CREATE
					</button>
				</div>
				{display && (
					<>
						<div className="form-group">
							<small className="form-text">Tell us more about Event</small>
							<textarea placeholder="..." rows="5" cols="50" name="bio"></textarea>
						</div>
					</>
				)}
			</form>
		</div>
	)
}

CreateEvent.propTypes = {
    addEvent: PropTypes.func.isRequired,
}

export default connect(null, {addEvent})(CreateEvent)