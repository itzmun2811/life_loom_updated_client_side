import { createBrowserRouter, Navigate } from "react-router";
import Payment from "../pages/Payment/Payment";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../pages/Home/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AllPolicies from "../pages/AllPolicies";
import PolicyDetails from "../pages/PolicyDetails";
import ApplicationForm from "../PrivatePage/ApplicationForm";
import Profile from "../pages/Profile/Profile";
import FAQs from "../pages/FAQs";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Quote from "../PrivatePage/Quote"
import DashBoard from "../pages/DashBoard/DashBoard";
import MyPolicies from "../pages/DashBoard/CustomerDashboard/MyPolicies";
import PaymentPage from "../pages/DashBoard/CustomerDashboard/PaymentPage";

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
    path: "/register",
    element: <Register></Register>,
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
  element:<PrivateRoute><Quote></Quote></PrivateRoute>
 },
 {
    path: "/application",
    element:<PrivateRoute><ApplicationForm></ApplicationForm></PrivateRoute>
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
    path: "/payment/:id",
    element: <PaymentPage></PaymentPage>
  },
  {
    path: "/profile",
    element: <Profile></Profile>
  },
 {
    path: "/myPolicy",
    element:<PrivateRoute><MyPolicies></MyPolicies></PrivateRoute>
  },
  
 {
    path: "/dashboard",
    element:<DashBoard></DashBoard>
  },
  
  
  
  ]
  },
  {
    path: "/payment",
    element: <Payment></Payment>,
  },

]);