import React from "react";
import LoginPage from "../src/pages/LoginPage";
import SignUpPage from "../src/pages/SignUpPage";

import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";


function App() {
  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
  ]);
  return (
    <div>
     <RouterProvider router={AppRouter}/>
    </div>
  );
}

export default App;
