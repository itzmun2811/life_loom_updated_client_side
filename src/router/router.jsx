import { createBrowserRouter } from "react-router";
import Payment from "../pages/Payment/Payment";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../pages/Home/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AllPolicies from "../pages/AllPolicies";
import PolicyDetails from "../pages/PolicyDetails";
import Quote from "../PrivatePage/Quote";
import ApplicationForm from "../PrivatePage/ApplicationForm";

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
  },
    {
    path: "/allPolicies",
    element: <AllPolicies></AllPolicies>
  },
    {
    path: "/allPolicies/:id",
    element: <PolicyDetails></PolicyDetails>
  },
  
 {
    path: "/quote",
    element: <Quote></Quote>
  },
 {
    path: "/application",
    element: <ApplicationForm></ApplicationForm>
  },
  
  
  
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