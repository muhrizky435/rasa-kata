import { useState, useEffect } from "react";
import "../assets/styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import logoIcon from "../assets/img/logoIcon.png";
import dashboardIcon from "../assets/img/dashboardIcon.png";
import curhatIcon from "../assets/img/curhatIcon.png";
import unggahIcon from "../assets/img/unggahIcon.png";
import logoutIcon from "../assets/img/logout.png";
import LeftIcon from "../assets/img/leftIcon.png";
import RightIcon from "../assets/img/rightIcon.png";
import Swal from "sweetalert2";
import authService from "../services/authService";

import { Outlet } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [isMobile, setIsMobile] = useState(false);
    const user = authService.getCurrentUser();
    const userName = user.name.split(" ")[0] || "User";

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout action here
        authService.logout();
        console.log(authService.isAuthenticated());
        window.location.href = "/login";
      }
    });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <div className="">
      {isMobile ? (
        <div className="mobile-bottom-nav">
          <div className="mobile-nav-menu">
            <Link
              to="/dashboard"
              className={`mobile-menu-item ${
                isActive("/dashboard") ? "active" : ""
              }`}
            >
              <img src={dashboardIcon} alt="Dashboard" />
            </Link>

            <Link
              to="/curhat"
              className={`mobile-menu-item ${
                isActive("/curhat") ? "active" : ""
              }`}
            >
              <img src={curhatIcon} alt="Curhat" />
            </Link>

            <Link
              to="/feed"
              className={`mobile-menu-item ${
                isActive("/feed") ? "active" : ""
              }`}
            >
              <img src={unggahIcon} alt="Unggah" />
            </Link>

                        <button className="mobile-menu-item" style={{ background: "none", border: "none" }} onClick={handleLogout}>
                            <img src={logoutIcon} alt="logout Icon" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className={`sidebar`}>
                    <div className="logo-container">
                        <div className="logo">
                            <img src={logoIcon} alt="Logo" className="logo-icon" />
                             <span className="logo-text">RasaKata</span>
                        </div>
                    </div>

          <div className="nav-menu">
            <div className="menu-item">
              <Link
                to="/dashboard"
                className={`menu-link ${
                  isActive("/dashboard") ? "active" : ""
                }`}
              >
                <div className="icon-container">
                  <img src={dashboardIcon} alt="Dashboard Icon" />
                </div>
                <span className="menu-text">Dashboard</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                to="/curhat"
                className={`menu-link ${isActive("/curhat") ? "active" : ""}`}
              >
                <div className="icon-container">
                  <img src={curhatIcon} alt="Curhat Icon" />
                </div>
                <span className="menu-text">Curhat</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                to="/feed"
                className={`menu-link ${isActive("/feed") ? "active" : ""}`}
              >
                <div className="icon-container">
                  <img src={unggahIcon} alt="Unggah Icon" />
                </div>
                <span className="menu-text">Unggah Cerita</span>
              </Link>
            </div>
          </div>

          <div className="user-section">
            <Link
              to="/profile"
              className={`user-avatar ${isActive("/profile") ? "active" : ""}`}>
              <img
                src="" alt="User Avatar" className="avatar-img"/>
            </Link>

            
              <div className="user-info">
                <p className="user-greeting">Hai, {userName}!</p>
              </div>
            
          </div>

          <div className="logout-section">
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              <img src={logoutIcon} alt="logoutIcon" className="logout-icon" />
              <p>Logout</p>
            </button>
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.key}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Layout;
