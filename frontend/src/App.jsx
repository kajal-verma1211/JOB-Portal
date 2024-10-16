import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import Home from "./component/Home";
import Jobs from "./component/Jobs";
import Browse from "./component/Browse";
import Profile from "./component/Profile";
import JobDescription from "./component/JobDescription";
import Companies from "./component/admin/Companies";
import CompanyCreate from "./component/admin/CompanyCreate";
import CompanySetup from "./component/admin/companySetup";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "/signup",
    element:<Signup/>
  },
  {
    path: "/jobs",
    element:<Jobs/>
  },
  {
    path: "/description/:id",
    element:<JobDescription/>
  },
  {
    path: "/browse",
    element:<Browse/>
  },
  {
    path: "/profile",
    element:<Profile/>
  },

  //for admin
  {
    path: "/admin/companies",
   element:<Companies/>
  },
  {
    path: "/admin/companies/create",
    element:<CompanyCreate/>
  },
 {
   path: "/admin/companies/:id",
  element:<CompanySetup/>
  }
  
]);


function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  );
}

export default App;
