import { createBrowserRouter } from "react-router-dom";
import App from "../Layouts/App";
import Home from "../Pages/Home/Home/Home";
import Courses from "../Pages/Courses/Courses";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import AdminRoute from "./AdminRoute";
import Users from "../Pages/Dashboard/Users/Users";
import ManageCourses from "../Pages/Dashboard/ManageCourses/ManageCourses";
import FeedbackForm from "../Pages/Dashboard/ManageCourses/FeedbackForm";
import InstructorRoute from "./InstructorRoute";
import AddCourse from "../Pages/Dashboard/AddCourse/AddCourse";
import CourseList from "../Pages/Dashboard/CourseList/CourseList";
import UpdateCourse from "../Pages/Dashboard/UpdateCourse/UpdateCourse";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import SelectedCourses from "../Pages/Dashboard/SelectedCourses/SelectedCourses";
import Payment from "../Pages/Dashboard/Payment/Payment";
import EnrolledCourses from "../Pages/Dashboard/EnrolledCourses/EnrolledCourses";

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
    path: "dashboard",
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
        path: "course-feedback/:id",
        element: (
          <AdminRoute>
            <FeedbackForm />
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
      {
        path: "update-profile",
        element: (
          <InstructorRoute>
            <UpdateProfile />
          </InstructorRoute>
        ),
      },

      {
        path: "selected-courses",
        element: <SelectedCourses />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
      },
      {
        path: "enrolled-courses",
        element: <EnrolledCourses />,
      },
    ],
  },
]);

export default router;
