import React, { useContext } from 'react'
import StateContext from '../context/StateContext'
import HomeLoggedOut from '../components/home-LoggedOut/HomeLoggedOut'
import HomeLoggedIn from '../components/home-LoggedIn/HomeLoggedIn'

export default function Home() {
  const appState = useContext(StateContext)
  return (
    <>
      {(!appState.loggedIn) ? <HomeLoggedOut /> : <HomeLoggedIn />}
    </>
  )
}
