import { Link, useNavigate } from "react-router-dom";

const CustomNavLink = ({ to, children }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <Link
      to={to}
      className="text-white font-medium hover:text-black hover:bg-green-300 px-3 py-2 rounded-md transition-all duration-300"
      style={{
        ...(window.location.pathname === to && {
          backgroundColor: "transparent",
          color: "black",
        }),
      }}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default CustomNavLink;
