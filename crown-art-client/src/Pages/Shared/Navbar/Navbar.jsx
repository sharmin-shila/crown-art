import { Link } from "react-router-dom";

const Navbar = () => {
  const navOptions = (
    <>
      <li className="font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="font-semibold">
        <Link to="/">Instructors</Link>
      </li>
      <li className="font-semibold">
        <Link to="/">Courses</Link>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-[#283333cc] xl:px-20 md:px-10 sm:px-2 px-4 text-base-100">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Crown Art
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <Link to="/login" className="btn btn-outline border-[#90c641e6] hover:btn-info text-[#90c641e6]">Login</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
