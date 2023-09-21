import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../auth/authSlice'
import { Navigate } from 'react-router-dom'

const ProtectedAdmin = () => {
    const user=useSelector(selectLoggedInUser)

    if(!user){
        <Navigate to='/login' replace={true}></Navigate>
    }
    if(user && user.role!=='admin'){
        <Navigate to='/' replace={true}></Navigate>
    }
  return (
    <div>ProtectedAdmin</div>
  )
}

export default ProtectedAdmin