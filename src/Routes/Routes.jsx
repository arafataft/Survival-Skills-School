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
            }
          ]
        }
      ]
    },
  ]);