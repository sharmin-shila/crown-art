import { createBrowserRouter } from "react-router-dom";
import App from "../Layouts/App";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Users from "../Pages/Dashboard/Users/Users";
import AdminRoute from "./AdminRoute";
import AddCourse from "../Pages/Dashboard/AddCourse/AddCourse";
import InstructorRoute from "./InstructorRoute";
import CourseList from "../Pages/Dashboard/CourseList/CourseList";
import Courses from "../Pages/Courses/Courses";
import UpdateCourse from "../Pages/Dashboard/UpdateCourse/UpdateCourse";
import ManageCourses from "../Pages/Dashboard/ManageCourses/ManageCourses";

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
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "manage-courses",
        element: (
          <AdminRoute>
            <ManageCourses />
          </AdminRoute>
        ),
      },
      {
        path: "add-course",
        element: (
          <InstructorRoute>
            <AddCourse />
          </InstructorRoute>
        ),
      },
      {
        path: "course-list",
        element: (
          <InstructorRoute>
            <CourseList />
          </InstructorRoute>
        ),
      },
      {
        path: "update-course/:id",
        element: (
          <InstructorRoute>
            <UpdateCourse />
          </InstructorRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/courses/${params.id}`),
      },
    ],
  },
]);

export default router;
