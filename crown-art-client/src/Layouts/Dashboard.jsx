import { Link, Outlet } from "react-router-dom";
import Container from "../Pages/Shared/Container/Container";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="drawer lg:drawer-open pt-20">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
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
              <li>
                <Link to="/dashboard/manage-users">All Users</Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
