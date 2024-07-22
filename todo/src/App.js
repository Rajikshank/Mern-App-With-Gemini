import { useState } from "react";
import Login from "./components/Login";
import Hey from "./components/Task";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const [signup, setSignup] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setSignup={setSignup} signup={signup} />,
    },
    {
      path: "/Dashboard/:userid",
      element: <ProtectedRoute Component={Dashboard} />,
    },
  ]);

  return (
    <div className="bg-gray-900 ">
      {/* <Login setSignup={setSignup} signup={signup}></Login> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
