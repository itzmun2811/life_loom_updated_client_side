import { createBrowserRouter } from "react-router";
import Payment from "../pages/Payment/Payment";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../pages/Home/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";

export const router = createBrowserRouter([
  
   {
    path:'/',
    element:<MainLayOut></MainLayOut>,
    children:[
    {
      index:true,
      path:'/',
      element:<Home></Home>,
    },
    {
    path: "/login",
    element: <Login></Login>,
  }
  
  
  
  ]
  },
  {
    path: "/payment",
    element: <Payment></Payment>,
  },

  {
    path: "/register",
    element: <Register></Register>,
  },
 
]);