import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth/useAuth";
import toast from "react-hot-toast";
import Avatar from "./Avatar";
import CustomNavLink from "../../../Components/CustomNavLink/CustomNavLink";
import useAdmin from "../../../Hooks/useAdmin/useAdmin";
import useInstructor from "../../../Hooks/useInstructor/useInstructor";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const { isAdmin } = useAdmin();
  const { isInstructor } = useInstructor();

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navOptions = (
    <>
      <li className="font-semibold">
        <CustomNavLink to="/">Home</CustomNavLink>
      </li>
      <li className="font-semibold">
        <CustomNavLink to="/courses">Courses</CustomNavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-slate-700 xl:px-20 md:px-10 sm:px-2 px-4 text-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Crown Art
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <Avatar></Avatar>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-[#283333cc] rounded-box w-52"
              >
                <li>
                  <Link
                    to={
                      isAdmin
                        ? "/dashboard/manage-users"
                        : isInstructor
                        ? "/dashboard/add-course"
                        : "/dashboard/selected-courses"
                    }
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogOut}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              className="btn btn-outline border-[#90c641e6] hover:btn-info text-[#90c641e6]"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
