import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth/useAuth";
import useInstructor from "../Hooks/useInstructor/useInstructor";
import Loader from "../Pages/Shared/Loader/Loader";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isInstructor, isInstructorLoading } = useInstructor();

  if (loading || isInstructorLoading) {
    return <Loader />;
  }

  if (user && isInstructor) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
