import { createBrowserRouter, Navigate } from "react-router";
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
import ManageTransactions from "../pages/DashBoard/AdminDashboard/ManageTransactions"
import PaymentPage from "../pages/DashBoard/CustomerDashboard/PaymentPage"
import PaymentStatus from "../pages/DashBoard/CustomerDashboard/PaymentStatus";
import Blogs from "../pages/Blogs";
import ManageBlogs from "../pages/DashBoard/AgentDashboard/ManageBlogs";
import BlogPost from "../pages/DashBoard/AgentDashboard/BlogPost";
import AssignedCustomers from "../pages/DashBoard/AgentDashboard/AssignedCustomers";
import BlogDetails from "../pages/BlogDetails";
import PolicyClearance from "../pages/DashBoard/AgentDashboard/PolicyClearance";
import ClaimPolicyPage from "../pages/DashBoard/CustomerDashboard/ClaimPolicyPage";
import MyAgentApplication from "../pages/DashBoard/AgentDashboard/MyAgentApplication";
import UnAuthorized from "../pages/UnAuthorized";
import Forbidden from "../pages/Forbidden";
import AdminRoute from "./AdminRoute/AdminRoute";
import AgentRoute from "./AgentRoute/AgentRoute";
import BlogRoute from "./AdminRoute/BlogRoute";
import AgentApplicationRejection from "../pages/DashBoard/CustomerDashboard/AgentApplicationRejection";
import DashBoardOverView from "../pages/DashBoard/DashBoardOverView";
import CustomerStats from "../pages/DashBoard/CustomerDashboard/CustomerStats";




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
    path: "/faq",
    element: <FAQs></FAQs>
  },
 
  {
    path: "/beAgent",
    element: <PrivateRoute><BeAgentForm></BeAgentForm></PrivateRoute>
  },
 
  {
    path: "/blogs",
    element: <Blogs></Blogs>
  },
  {
    path: "/blogs/:id",
    element: <BlogDetails></BlogDetails>
  },
  
  {
    path: "/unauthorized",
    element: <UnAuthorized></UnAuthorized>
  },
  {
    path: "/forbidden",
    element: <Forbidden></Forbidden>
  },
 

 
 
  
 
 ]
  },
 
   {
    path:'/dashboard',
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
    
      // admin
{
    path: "manageAgent",
    element:<AdminRoute><ManageAgents></ManageAgents></AdminRoute>
  },
  
 {
    path: "manageApplication",
    element:<AdminRoute><ManageApplication></ManageApplication></AdminRoute>
  },
  
 {
    path: "manageUsers",
    element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
  },
 {
    path: "managePolicy",
    element:<AdminRoute><ManagePolicies></ManagePolicies></AdminRoute>
  },
  
 {
    path: "manageTransaction",
    element:<AdminRoute><ManageTransactions></ManageTransactions></AdminRoute>
  
  },
  // CUSTOMER
  {
    path: "myPolicy",
    element:<PrivateRoute><MyPolicies></MyPolicies></PrivateRoute>
  },
  {
    path: "payment/:id",
    element: <PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>
  },
  {
    path: "paymentStatus",
    element: <PrivateRoute><PaymentStatus></PaymentStatus></PrivateRoute>
  },
  {
    path: "claimPolicy",
    element:<PrivateRoute><ClaimPolicyPage></ClaimPolicyPage></PrivateRoute>
  },
  {
    path: "rejection",
    element: <PrivateRoute><AgentApplicationRejection></AgentApplicationRejection></PrivateRoute>
  },
  // AGENT && admin
   {
    path: "manageBlogs",
    element: <BlogRoute><ManageBlogs></ManageBlogs></BlogRoute>
  }, 
  {
    path: "blogPost",
    element: <BlogRoute><BlogPost></BlogPost></BlogRoute>
  }, 
    // AGENT
   {
    path: "policyClearance",
    element: <AgentRoute><PolicyClearance></PolicyClearance></AgentRoute>
  }, 
   {
    path: "myApplication",
    element:<AgentRoute><MyAgentApplication></MyAgentApplication></AgentRoute> 
  }, 
  {
    path: "assignedCustomer",
    element:<AgentRoute> <AssignedCustomers></AssignedCustomers></AgentRoute>
  },
   {
    path: "dashBoardOverView",
    element: <DashBoardOverView></DashBoardOverView>
  },
  
   {
    path: "profile",
    element: <Profile></Profile>
  },
   {
    path: "customerStats",
    element: <CustomerStats></CustomerStats>
  },
  

    ]
  }
  
]);