import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, Auth: { loggedIn}, ...rest}) => {
    return (
        <Route {...rest} render = {props =>
        !loggedIn ? (
            <Redirect to = '/login' />
        ): (
            <Component {...props} />
        )
        } />
    )
}

PrivateRoute.propTypes = {
    Auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    Auth: state.Auth
})

export default connect(mapStateToProps)(PrivateRoute)
