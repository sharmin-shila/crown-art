import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Container from "../Pages/Shared/Container/Container";

const App = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="pt-20">
          <Outlet />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default App;
