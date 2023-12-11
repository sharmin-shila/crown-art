import { Outlet } from "react-router-dom";
import Container from "../Pages/Shared/Container/Container";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import useAdmin from "../Hooks/useAdmin/useAdmin";
import useInstructor from "../Hooks/useInstructor/useInstructor";
import CustomNavLink from "../Components/CustomNavLink/CustomNavLink";

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  const { isInstructor } = useInstructor();

  return (
    <>
      <Navbar />
      <Container>
        <div className="drawer lg:drawer-open pt-20">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <Outlet />
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-60 min-h-full bg-[#90c641e6] text-base-content">
              {isAdmin && (
                <>
                  <li>
                    <CustomNavLink to="/dashboard/manage-users">
                      Manage Users
                    </CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink to="/dashboard/manage-courses">
                      Manage Courses
                    </CustomNavLink>
                  </li>
                </>
              )}

              {isInstructor && (
                <>
                  <li>
                    <CustomNavLink to="/dashboard/add-course">
                      Add Course
                    </CustomNavLink>
                  </li>
                  <li>
                    <CustomNavLink to="/dashboard/course-list">
                      Course List
                    </CustomNavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
