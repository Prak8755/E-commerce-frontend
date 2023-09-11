import React, { useDebugValue, useEffect } from "react";
import LoginPage from "../src/pages/LoginPage";
import SignUpPage from "../src/pages/SignUpPage";




import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element:<Protected><Home /></Protected> 
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
]);


function App() {

  const dispatch=useDispatch();

  const user=useSelector(selectLoggedInUser);
  

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }  
  },[dispatch,user?.id])
  
  return (
    <div>
     <RouterProvider router={AppRouter}/>
    </div>
  );
}

export default App;
