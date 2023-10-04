import React, {  useEffect } from "react";
import LoginPage from "../src/pages/LoginPage";
import SignUpPage from "../src/pages/SignUpPage";
import PageNotFound from './pages/PageNotFound'
import { transitions, positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


import Home from "./pages/Home";
import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from './pages/UserProfilePage';
import { fetchedLoggedInUserAsync} from "./features/user/userSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import Logout from "./pages/Logout";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/Admin/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrderPage from './pages/AdminOrderPage';


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element:<Protected><Home /></Protected> 
  },
  {
    path: "/admin",
    element:<ProtectedAdmin>
      <AdminHome/>
    </ProtectedAdmin>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/logout",
    element: <Logout/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage/>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>
  },
  {
    path: "/checkout",
    element:<Protected>  <CheckOut /></Protected>,
  },
  {
    path: "/product-details/:id",
    element: <Protected><ProductDetailPage /></Protected>
  },
  {
    path: "/admin/product-details/:id",
    element: <ProtectedAdmin><AdminProductDetailPage /></ProtectedAdmin>
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrderPage></AdminOrderPage></ProtectedAdmin>
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
  },
  {
    path: "/admin/product-form/:id",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
  },
  {
    path: "/orders",
    element: <Protected><UserOrderPage></UserOrderPage></Protected>
  },
  {
    path: "/profile",
    element: <Protected><UserProfilePage></UserProfilePage></Protected>
  },
  {
path:'/order-success/:id',
element:<Protected><OrderSuccessPage/></Protected>
  },
  {
    path:'*',
    element:<PageNotFound></PageNotFound>
  }
]);


function App() {
  
  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px', 
    // you can also just use 'scale'
    transition: transitions.SCALE
  }
  
  const dispatch=useDispatch();

  const user=useSelector(selectLoggedInUser);

   

  useEffect(()=>{

    if(user&&user.role==='user'){
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchedLoggedInUserAsync(user.id));
 
    }  
   

  },[dispatch,user])
  
  return (
    <div>
      <Provider template={AlertTemplate} {...options}>
     <RouterProvider router={AppRouter}/>
     </Provider>
    </div>
  );
}

export default App;


//signup.js--commented one line 

