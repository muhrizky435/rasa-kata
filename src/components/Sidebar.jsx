import React, { useState, useEffect } from "react";
import "../assets/styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import logoIcon from "../assets/img/logoIcon.png";
import dashboardIcon from "../assets/img/dashboardIcon.png";
import jejakIcon from "../assets/img/jejakIcon.png";
import curhatIcon from "../assets/img/curhatIcon.png";
import unggahIcon from "../assets/img/unggahIcon.png";
import settingIcon from "../assets/img/settingIcon.png";
import LeftIcon from "../assets/img/leftIcon.png";
import RightIcon from "../assets/img/rightIcon.png";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="mobile-bottom-nav">
        <div className="mobile-nav-menu">
          <Link to="/dashboard" className={`mobile-menu-item ${isActive("/dashboard") ? "active" : ""}`}>
            <img src={dashboardIcon} alt="Dashboard" />
          </Link>

          <Link to="/curhat" className={`mobile-menu-item ${isActive("/curhat") ? "active" : ""}`}>
            <img src={curhatIcon} alt="Curhat" />
          </Link>

          <Link to="/jejak" className={`mobile-menu-item ${isActive("/jejak") ? "active" : ""}`}>
            <img src={jejakIcon} alt="Jejak" />
          </Link>

          <Link to="/feed" className={`mobile-menu-item ${isActive("/feed") ? "active" : ""}`}>
            <img src={unggahIcon} alt="Unggah" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="logo-container">
        <div className="logo">
          <img src={logoIcon} alt="Logo" className="logo-icon" />
          {!collapsed && <span className="logo-text">RasaKata</span>}
        </div>
        <button className="collapse-button" onClick={toggleSidebar}>
          <div className="collapse-icon-wrapper">
            <img
              src={collapsed ? RightIcon : LeftIcon}
              alt="Toggle Sidebar"
              className="collapse-icon"
            />
          </div>
        </button>
      </div>

      <div className="nav-menu">
        <div className="menu-item">
          <Link
            to="/dashboard"
            className={`menu-link ${isActive("/dashboard") ? "active" : ""}`}
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
            to="/jejak"
            className={`menu-link ${isActive("/jejak") ? "active" : ""}`}
          >
            <div className="icon-container">
              <img src={jejakIcon} alt="Jejak Icon" />
            </div>
            <span className="menu-text">Jejak Emosi</span>
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
        <div className="user-avatar">
          <span>👤</span>
        </div>
        {!collapsed && (
          <div className="user-info">
            <p className="user-greeting">Hai, Hanifan!</p>
          </div>
        )}
      </div>

      <div className="settings-section">
        <Link to="/pengaturan" className="settings-link">
          <img src={settingIcon} alt="Setting Icon" className="settings-icon" />
          {!collapsed && <span>Pengaturan</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
