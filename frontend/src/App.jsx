import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import Home from "./component/Home";
import Jobs from "./component/Jobs";
import Browse from "./component/Browse";

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
    path: "/browse",
    element:<Browse/>
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
