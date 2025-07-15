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
import Quote from "../PrivatePage/Quote";
import MyPolicies from "../pages/DashBoard/CustomerDashboard/MyPolicies"
import BeAgentForm from "../pages/BeAgentForm"
import Dashboard from "../pages/DashBoard/AdminDashboard/Dashboard";
import ManageAgents from "../pages/DashBoard/AdminDashboard/ManageAgents";
import ManageUsers from "../pages/DashBoard/AdminDashboard/ManageUsers";
import ManagePolicies from "../pages/DashBoard/AdminDashboard/ManagePolicies";
import ManageApplication from "../pages/DashBoard/AdminDashboard/ManageApplication";
import ManageTransactions from "../pages/DashBoard/AdminDashboard/ManageTransactions";
import PaymentPage from "../pages/DashBoard/CustomerDashboard/PaymentPage";
import PaymentStatus from "../pages/DashBoard/CustomerDashboard/PaymentStatus";
import ClaimPayment from "../pages/DashBoard/CustomerDashboard/ClaimPayment";
import Blogs from "../pages/Blogs";
import ManageBlogs from "../pages/DashBoard/AgentDashboard/ManageBlogs";
import BlogPost from "../pages/DashBoard/AgentDashboard/BlogPost";
import AssignedCustomers from "../pages/DashBoard/AgentDashboard/AssignedCustomers";


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
    path: "/profile",
    element: <Profile></Profile>
  },
 
  {
    path: "/beAgent",
    element: <PrivateRoute><BeAgentForm></BeAgentForm></PrivateRoute>
  },
 
  {
    path: "/blogs",
    element: <Blogs></Blogs>
  },
 
 
  
 
 ]
  },
  {
    path: "/payment",
    element: <Payment></Payment>,
  },
   {
    path:'/dashboard',
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
{
    path: "manageAgent",
    element:<ManageAgents></ManageAgents>
  },
  
 {
    path: "manageApplication",
    element:<ManageApplication></ManageApplication>
  },
  
 {
    path: "manageUsers",
    element:<ManageUsers></ManageUsers>
  },
 {
    path: "managePolicy",
    element:<ManagePolicies></ManagePolicies>
  },
  
 {
    path: "manageTransaction",
    element:<ManageTransactions></ManageTransactions>
  
  },
  // CUSTOMER
  {
    path: "myPolicy",
    element:<MyPolicies></MyPolicies>
  },
  {
    path: "payment/:id",
    element: <PaymentPage></PaymentPage>
  },
  {
    path: "paymentStatus",
    element: <PaymentStatus></PaymentStatus>
  },
  {
    path: "claimPayments",
    element: <ClaimPayment></ClaimPayment>
  },
  // AGENT
   {
    path: "manageBlogs",
    element: <ManageBlogs></ManageBlogs>
  }, {
    path: "blogPost",
    element: <BlogPost></BlogPost>
  }, {
    path: "assignCustomer",
    element: <AssignedCustomers></AssignedCustomers>
  },

    ]
  }

]);