import React from 'react'
import UserOrder from '../features/user/component/UserOrder'
import NavBar from '../features/navbar/Navbar';


const UserOrderPage = () => {
  return (
    <>
    
    <NavBar>
          <h1 className='text-4xl text-center'>My Orders</h1>
                  <UserOrder></UserOrder>
    </NavBar>
    </>
  )
}

export default UserOrderPage