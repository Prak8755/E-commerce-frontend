import React from 'react'
import Navbar from '../features/navbar/Navbar'
import { AdminProductList } from '../features/Admin/AdminProductList'

const AdminHome = () => {


  return (
    <>
    <Navbar>
      <h1 className='text-3xl'>Admin Page</h1>
    <AdminProductList></AdminProductList>
    </Navbar>
    </>
  )
}

export default AdminHome