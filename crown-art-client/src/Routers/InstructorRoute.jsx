import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth/useAuth";
import useInstructor from "../Hooks/useInstructor/useInstructor";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isInstructor, isInstructorLoading } = useInstructor();

  if (loading || isInstructorLoading) {
    return <span className="loading loading-dots loading-lg text-error"></span>;
  }

  if (user && isInstructor) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
