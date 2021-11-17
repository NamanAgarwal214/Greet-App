import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'

export function IsUserRedirect({ loggedInPath, children, ...rest}) {
  const {user} = useSelector(state => state.Auth)
  return (
    <Route {...rest}
      render = {() => {
        if(!user){
          return children
        }

        if(user){
          return (
            <Redirect
            to={{
              pathname: '/home'
            }}
            />
          )
        }
        return null
      }}
    />
  )
}