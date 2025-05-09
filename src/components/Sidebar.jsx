import React, { useState } from "react";
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
  const toggleSidebar = () => setCollapsed(!collapsed);

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
          {!collapsed && (
            <div className="submenu">
              <div className="submenu-new">+ Baru</div>
              <div className="submenu-preview">previous chat preview...</div>
            </div>
          )}
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
            to="/unggah"
            className={`menu-link ${isActive("/unggah") ? "active" : ""}`}
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
