import React, { useState, useEffect } from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import "./dashboard.css";

const Navslider = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const handleToggle = () => {
    setIsNavVisible(!isNavVisible);
  };
  const navigate = useNavigate();
  const clearCookies = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <div id="body-pd" className={isNavVisible ? "body-pd" : ""}>
      <header
        id="header"
        className={isNavVisible ? "header body-pd" : "header "}
      >
        <div className="header_toggle">
          <i
            className={isNavVisible ? "bx bx-x" : "bx bx-menu"}
            id="header-toggle"
            onClick={handleToggle}
          ></i>
        </div>
        <span className="ml-auto">Hello, {localStorage.getItem("uname")}</span>
      </header>
      <div id="nav-bar" className={isNavVisible ? "show l-navbar" : "l-navbar"}>
        <nav className="nav">
          <div>
            <NavLink to="/" className="nav_logo">
              <i className="bx bx-home-alt nav_logo-icon"></i>
              <span>
                <img
                  src={process.env.PUBLIC_URL + "/logopng.png"}
                  alt="logopng"
                  className="navlogo w-25"
                />
              </span>
            </NavLink>
            <div className="nav_list">
              <NavLink
                to="/db/dashboard"
                className="nav_link"
                activeClassName="active"
              >
                <i className="bx bx-grid-alt nav_icon"></i>
                <span className="nav_name">Dashboard</span>
              </NavLink>
              <NavLink
                to="/db/profile"
                className="nav_link"
                activeClassName="active"
              >
                <i className="bx bxs-user"></i>
                <span className="nav_name">Profile</span>
              </NavLink>
              <NavLink
                to="/db/links"
                className="nav_link "
                activeClassName="active"
              >
                <i className="bx bx-link-alt nav_icon"></i>
                <span className="nav_name">Links</span>
              </NavLink>
              <NavLink
                to="/db/withdraw"
                className="nav_link"
                activeClassName="active"
              >
                <i className="bx bx-wallet nav_icon"></i>
                <span className="nav_name">Withdraw</span>
              </NavLink>
              <NavLink
                to="/db/support"
                className="nav_link"
                activeClassName="active"
              >
                <i className="bx bx-support nav_icon"></i>
                <span className="nav_name">Support</span>
              </NavLink>
            </div>
          </div>
          <span className="nav_link" onClick={clearCookies}>
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </span>
        </nav>
      </div>
    </div>
  );
};

export default Navslider;
