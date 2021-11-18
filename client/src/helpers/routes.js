import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export function IsUserRedirect({ loggedInPath, children, ...rest}) {
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
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
              pathname: loggedInPath
            }}
            />
          )
        }
        return null
      }}
    />
  )
}