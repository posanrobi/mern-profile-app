import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import CreateUser from "./CreateUser";
import Users from "./Users";
import EditUser from "./EditUser";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Users /> },
    { path: "/createuser", element: <CreateUser /> },
    { path: "/edituser/:id", element: <EditUser /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
