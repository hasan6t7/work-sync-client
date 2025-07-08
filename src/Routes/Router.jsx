import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

export default router;
