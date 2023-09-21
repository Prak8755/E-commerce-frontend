import React from 'react'
import Navbar from '../features/navbar/Navbar'
import { AdminProductList } from '../features/Admin/AdminProductList'

const AdminHome = () => {


  return (
    <>
    <Navbar>
    <AdminProductList></AdminProductList>
    </Navbar>
    </>
  )
}

export default AdminHome