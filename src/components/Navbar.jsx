import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeStyle = ({ isActive }) =>
    isActive
      ? "font-bold text-yellow-400"
      : "text-gray-300 hover:text-white";

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink className="text-2xl font-bold text-yellow-500" to="/">
          Кінопошук
        </NavLink>
        <div className="flex gap-6">
          <NavLink className={activeStyle} to="/">
            Головна
          </NavLink>
          <NavLink className={activeStyle} to="/movies">
            Фільми
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
