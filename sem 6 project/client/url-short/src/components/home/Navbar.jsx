import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const token = localStorage.getItem('token')
  return (
    <>
      <nav className="navbar navbar-expand-lg pt-2  text-white fixed-top mb-5">
        <div className="container-fluid px-5 mybg">
          <div className="d-flex justify-content-center">
            <NavLink  to="/">
              <img
                src={process.env.PUBLIC_URL + '/logopng.png'} 
                alt="logopng"
                className="navlogo mx-3"
              />
            </NavLink>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item px-md-5">
                <Link className="nav-link text-white" to="/db/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item px-md-5">
                <a className="nav-link text-white" href="#">
                  Api
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              
              
        {
          !token ?
        
        location.pathname !== '/login' && (
          <li className="nav-item px-md-5">
          <NavLink className="nav-link text-white" to="/login">
            Login
          </NavLink>
        </li>
        ):''}
        { !token ? location.pathname !== '/signup' && (
          <li className="nav-item px-md-5">
          <NavLink className="nav-link text-white" to="/signup">
          <button className="btn btn-primary">Sign up Free</button>
          </NavLink>
        </li>
        ):''}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
