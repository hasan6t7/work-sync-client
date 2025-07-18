import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import DashLayout from "../Layouts/DashLayout";
import DashboardHome from "../Pages/Dashboard/DashHome/DashboardHome";
import EmployeeWorkSheet from "../Pages/Dashboard/Employee/EmployeeWorkSheet";
import EmployeeList from "../Pages/Dashboard/HR/EmployeeList";
import EmployeeDetails from "../Pages/Dashboard/HR/EmployeeDetails";
import Progress from "../Pages/Dashboard/HR/Progress";

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
  {
    path: "/dashboard",
    element: <DashLayout></DashLayout>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/work-sheet",
        element: <EmployeeWorkSheet></EmployeeWorkSheet>,
      },
      {
        path: "/dashboard/employee-list",
        element: <EmployeeList></EmployeeList>,
      },
      {
        path: "/dashboard/details/:slug",
        element: <EmployeeDetails></EmployeeDetails>,
      },
      {
        path: "/dashboard/progress",
        element: <Progress></Progress>,
      },
    ],
  },
]);

export default router;
