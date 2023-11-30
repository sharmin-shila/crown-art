import { createBrowserRouter } from "react-router-dom";
import App from "../Layouts/App";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
