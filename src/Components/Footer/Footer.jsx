import React from "react";
import "./Footer.css";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="footer">
      <div className="footer-overlay">
        <div className="footer-top">
          <h2>
            <span className="highlight">Where Design Meets Descipline</span>
          </h2>
        </div>

        <div className="footer-content">
          <div className="footer-col">
            <h3>Dynamic</h3>
            <h3>Project</h3>
            <h3>Management</h3>
            <h3>Consultancy</h3>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <p>pratima@dynamicpmc.com</p>
            <p>admin@dynamicpmc.com</p>
            <p>project@dynamicpmc.com</p>
            <p>Admin +91 9420426774</p>
          </div>

          <div className="footer-col">
            <h4>Address</h4>
            <p>Keyproject</p>
            <p>Ravet</p>
          </div>

          <div className="footer-col">
            <h4>Quick Link</h4>
            <ul>
              {location.pathname === "/" ? (
                <>
                  <li>
                    <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer">
                      Home
                    </ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer">
                      AboutUs
                    </ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="services" smooth={true} duration={500} className="cursor-pointer">
                      Services
                    </ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="projects" smooth={true} duration={500} className="cursor-pointer">
                      Projects
                    </ScrollLink>
                  </li>
                  <li>
                    <RouterLink to="/contact">ContactUs</RouterLink>
                  </li>
                </>
              ) : (
                <>
                  <li><RouterLink to="/">Home</RouterLink></li>
                  <li><RouterLink to="/#about">AboutUs</RouterLink></li>
                  <li><RouterLink to="/#projects">Projects</RouterLink></li>
                  <li><RouterLink to="/#services">Services</RouterLink></li>
                  <li><RouterLink to="/contact">ContactUs</RouterLink></li>
                </>
              )}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Follow us</h4>
            <div className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-linkedin-in"></i>
            </div>
          </div>  
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Dynamic Project Management Consultancy. All Rights Reserved.</p>
        <p className="developer-credit">
          Project developed by <a href="https://webcresta.com" target="_blank" rel="noopener noreferrer" className="developer-link">WebCresta</a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
