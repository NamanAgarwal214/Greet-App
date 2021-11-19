import React from 'react'
import { useSelector } from 'react-redux'
import HomeLoggedOut from '../components/home-LoggedOut/HomeLoggedOut'
import HomeLoggedIn from '../components/home-LoggedIn/HomeLoggedIn'
import Profile from '../components/profile/Profile'

export default function Home() {
  const user = useSelector(state => state.Auth.user)
  // console.log(user)
  return (
    <>
      {(user === null) ? <HomeLoggedOut /> : <HomeLoggedIn user={user} />}
      <Profile />
    </>
  )
}
