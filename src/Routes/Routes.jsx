import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import ManageClasses from "../Pages/Dashboard/AdminDashboard/ManageClasses/ManageClassses";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import MySelectedClasses from "../Pages/Dashboard/StudentDashboard/MySelectedClasses/MySelectedClasses";
import MyEnrolledClasses from "../Pages/Dashboard/StudentDashboard/MyEnrolledClasses/MyEnrolledClasses";
import Payment from "../Pages/Dashboard/StudentDashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/StudentDashboard/PaymentHistory/PaymentHistory";
import MyClasses from "../Pages/Dashboard/InstructorDashboard/MyClasses/MyClasses";
import AddaClass from "../Pages/Dashboard/InstructorDashboard/AddaClass/AddaClass";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'instructors',
          element:<Instructors/>
        },
        {
          path:'classes',
          element:<Classes/>
        },
        {
          path:'signup',
          element:<Register/>
        },
        {
          path:'dashboard',
          element:<Dashboard/>,
          children:[
            {
              path:'',
              element:<AdminHome/>
            },
            {
              path:'manageclasses',
              element:<ManageClasses/>
            },
            {
              path:'manageusers',
              element:<ManageUsers/>
            },
            {
              path:'myselectedclasses',
              element:<MySelectedClasses/>
            },
            {
              path:'myenrolledclasses',
              element:<MyEnrolledClasses/>
            },
            {
              path:'payment',
              element:<Payment/>
            },
            {
              path:'paymenthistory',
              element:<PaymentHistory/>
            },
            {
              path:'myclasses',
              element:<MyClasses/>
            },
            {
              path:'addaclass',
              element:<AddaClass/>
            }
          ]
        }
      ]
    },
  ]);