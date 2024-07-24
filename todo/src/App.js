import { useState } from "react";
import Login from "./components/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import SomethinwenWrong from "./components/SomethinwenWrong";

function App() {
  const [signup, setSignup] = useState(false);
  const [currentUser, setCurrentuser] = useState({});

  const router = createBrowserRouter([
    {
      errorElement: <SomethinwenWrong />,
      path: "/",
      element: (
        <Login
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
      errorElement: <SomethinwenWrong />,
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
