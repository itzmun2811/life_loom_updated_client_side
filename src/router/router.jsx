import { createBrowserRouter, Navigate } from "react-router";
import Payment from "../pages/Payment/Payment";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../pages/Home/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AllPolicies from "../pages/AllPolicies";
import PolicyDetails from "../pages/PolicyDetails";

import ApplicationForm from "../PrivatePage/ApplicationForm";
import Quote from "../PrivatePage/Quote";
import Profile from "../pages/Profile/Profile";
import FAQs from "../pages/FAQs";

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
   path:'/quote',
   element:<Navigate to='/quote/defaultPolicy'></Navigate>
  },
 {
    path: "/quote/:policyName",
    element: <Quote></Quote>
  },
 {
    path: "/application",
    element: <ApplicationForm></ApplicationForm>
  },
  
 {
    path: "/profile",
    element: <Profile></Profile>
  },
  
 {
    path: "/faq",
    element: <FAQs></FAQs>
  },
  
 {
    path: "/profile",
    element: <Profile></Profile>
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