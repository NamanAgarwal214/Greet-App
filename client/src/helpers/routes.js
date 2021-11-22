import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export function IsUserRedirect({ loggedInPath, loggedIn, children, ...rest}) {
  
  return (
    <Route {...rest}
      render = {() => {
        if(!loggedIn){
          return children
        }

        if(loggedIn){
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