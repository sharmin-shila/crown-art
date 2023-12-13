import { Outlet } from "react-router-dom";
import Container from "../Pages/Shared/Container/Container";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import useAdmin from "../Hooks/useAdmin/useAdmin";
import useInstructor from "../Hooks/useInstructor/useInstructor";
import CustomNavLink from "../Components/CustomNavLink/CustomNavLink";
import { FaUsers } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { GiClassicalKnowledge } from "react-icons/gi";
// import { MdClass } from "react-icons/md";
// import { FcPaid } from "react-icons/fc";

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  const { isInstructor } = useInstructor();

  return (
    <>
      <Navbar />
      <Container>
        <div className="pt-20 flex">
          <aside
            id="default-sidebar"
            className="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-[#90c641e6] dark:bg-gray-800">
              <ul className="space-y-2 min-h-full font-medium">
                {isAdmin && (
                  <>
                    <li>
                      <CustomNavLink to="/dashboard/manage-users">
                        <FaUsers size={20} />
                        Manage Users
                      </CustomNavLink>
                    </li>
                    <li>
                      <CustomNavLink to="/dashboard/manage-courses">
                        <SiGoogleclassroom size={20} />
                        Manage Courses
                      </CustomNavLink>
                    </li>
                  </>
                )}

                {isInstructor && (
                  <>
                    <li>
                      <CustomNavLink to="/dashboard/add-course">
                        <GiClassicalKnowledge size={20} />
                        Add Course
                      </CustomNavLink>
                    </li>
                    <li>
                      <CustomNavLink to="/dashboard/course-list">
                        <SiGoogleclassroom size={20} />
                        Course List
                      </CustomNavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            <button
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              type="button"
              className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Outlet />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
