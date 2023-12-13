import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "p-2 rounded-md bg-green-300 text-slate-700 cursor-pointer flex gap-2 items-center"
          : "p-2 rounded-md group hover:bg-green-300 text-white cursor-pointer transition-all flex gap-2 items-center"
      }
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
