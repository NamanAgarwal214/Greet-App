import React from 'react'
import { useSelector } from 'react-redux'
import HomeLoggedOut from '../components/landingPage-LoggedOut/HomeLoggedOut'
import HomeLoggedIn from '../components/landingPage-LoggedIn/HomeLoggedIn'

export default function Home() {
  const user = useSelector(state => state.Auth.user)
  // console.log(user)
  return (
    (user === null) ? <HomeLoggedOut /> : <HomeLoggedIn user={user} />
  )
}
