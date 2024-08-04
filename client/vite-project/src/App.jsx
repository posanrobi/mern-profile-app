import { Container, Typography } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import CreateUser from "./CreateUser";
import Users from "./Users";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Users /> },
    { path: "/createuser", element: <CreateUser /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Container>
        <Typography variant="h2" component="h1">
          User Profiles
        </Typography>
      </Container>
    </>
  );
}

export default App;
