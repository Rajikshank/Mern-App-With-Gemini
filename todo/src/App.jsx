import { useState } from "react";
import LandingPage from "./views/LandingPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import SomethinwentWrong from "./components/SomethinwentWrong";

function App() {
  const [signup, setSignup] = useState(false);
  const [currentUser, setCurrentuser] = useState({});

  //creating routes for our app
  const router = createBrowserRouter([
    {
      errorElement: <SomethinwentWrong />,
      path: "/",
      element: (
        <LandingPage
          setSignup={setSignup}
          signup={signup}
          setuser={setCurrentuser}
          user={currentUser}
        />
      ),
    },
    {
      path: "/Dashboard/:userid",
      element: (
        <ProtectedRoute
          Component={Dashboard}
          currentuser={currentUser}
          setuser={setCurrentuser}
        />
      ),
      errorElement: <SomethinwentWrong />,
    },
  ]);

  return (
    <div className="bg-gray-900 min-h-screen ">
      {/* <Login setSignup={setSignup} signup={signup}></Login> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
