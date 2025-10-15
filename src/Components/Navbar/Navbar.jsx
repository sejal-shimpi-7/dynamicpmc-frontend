import React from "react";
import "./Navbar.css";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      // Use react-router's navigation for a smoother experience
      // This part is an improvement over window.location.href
      // Note: This requires you to be on a page where the router is active.
      // We will assume this is handled by your main App component.
      // For now, keeping the simple logic that works.
      window.location.href = "/#" + id;
    }
  };

  return (
    <nav className="navbar">
      {/* NEW: Updated brand text structure */}
      <RouterLink to="/" className="navbar-brand">
        <span className="brand-main">D Y N A M I C</span>
        <span className="brand-sub">Project Management Consultancy</span>
      </RouterLink>

      <ul className="navbar-links">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink 
            to="/#about" 
            onClick={(e) => handleNavClick(e, "about")}
          >
            About Us
          </RouterLink>
        </li>
        <li>
          <RouterLink 
            to="/#services" 
            onClick={(e) => handleNavClick(e, "services")}
          >
            Services
          </RouterLink>
        </li>
        <li>
          <RouterLink 
            to="/#projects" 
            onClick={(e) => handleNavClick(e, "projects")}
          >
            Projects
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/contact">Contact Us</RouterLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;