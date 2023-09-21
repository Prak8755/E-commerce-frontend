import React, {  useEffect } from "react";
import LoginPage from "../src/pages/LoginPage";
import SignUpPage from "../src/pages/SignUpPage";
import PageNotFound from './pages/PageNotFound'



import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from './pages/UserProfilePage';
import { fetchedLoggedInUserAsync, selectUserInfo } from "./features/user/userSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import Logout from "./pages/Logout";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/Admin/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element:<Protected><Home /></Protected> 
  },
  {
    path: "/admin",
    element:<ProtectedAdmin>
      <AdminHome></AdminHome>
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

  const dispatch=useDispatch();

  const user=useSelector(selectLoggedInUser);

  
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchedLoggedInUserAsync(user.id))
    }  
  },[dispatch,user])
  
  return (
    <div>
     <RouterProvider router={AppRouter}/>
    </div>
  );
}

export default App;
