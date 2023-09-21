import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/component/UserProfile'

const UserProfilePage = () => {
  return (
    <div>
        <Navbar>
        <h1 className='text-4xl text-center'>My Information</h1>

            <UserProfile></UserProfile>
        </Navbar>
    </div>
  )
}

export default UserProfilePage