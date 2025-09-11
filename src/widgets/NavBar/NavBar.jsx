import { NavLink } from "react-router-dom";
import ThemeButton from "@/widgets/buttons/ThemeButton.jsx";

const NavBar = () => {
  return (
    <header className="navbar">
      <nav className="tabs">
        {/* <NavLink to="/about" className={({ isActive }) => isActive ? "tab active" : "tab"}>
          About Me
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => isActive ? "tab active" : "tab"}>
          Projects
        </NavLink> */}
      </nav>
      <div className="theme-btn">
        <ThemeButton />
      </div>
    </header>
  );
}
export default NavBar;