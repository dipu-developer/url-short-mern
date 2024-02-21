import React from 'react'
import 'boxicons'

import { NavLink } from 'react-router-dom'

const Navslider = () => {
  return (
    <>
      <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
    />
  <header className="header" id="header">
    <div className="header_toggle">
      <i className="bx bx-menu" id="header-toggle" />
    </div>
  </header>
  <div className="l-navbar" id="nav-bar">
    <nav className="nav">
      <div>
        <NavLink to="/" className="nav_logo">
          <i className="bx bx-home-alt nav_logo-icon" />
          <span>
            <img src="img/logopng.png" alt="logopng" className="navlogo w-25" />
          </span>
        </NavLink>
        <div className="nav_list">
          <a href="dashboard.html" className="nav_link">
            <i className="bx bx-grid-alt nav_icon" />
            <span className="nav_name">Dashboard</span>
          </a>
          <a href="profile.html" className="nav_link">
            <i className="bx bxs-user" />
            <span className="nav_name">Profile</span>
          </a>
          <a href="link.html" className="nav_link active">
            <i className="bx bx-link-alt nav_icon" />
            <span className="nav_name">Links</span>
          </a>
          <a href="withdraw.html" className="nav_link">
            <i className="bx bx-wallet nav_icon" />
            <span className="nav_name">Withdraw</span>
          </a>
          <a href="support.html" className="nav_link">
            <i className="bx bx-support nav_icon" />
            <span className="nav_name">Support</span>
          </a>
        </div>
      </div>
      <a href="#" className="nav_link">
        <i className="bx bx-log-out nav_icon" />
        <span className="nav_name">SignOut</span>
      </a>
    </nav>
  </div>
  <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>

    </>
  )
}

export default Navslider
