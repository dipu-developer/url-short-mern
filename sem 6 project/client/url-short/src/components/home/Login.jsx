import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [iconStatus, setIconStatus] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClick = () => {
    const passwordInput = document.getElementById("password");
    if (iconStatus === 1) {
      setIconStatus(2);
      passwordInput.type = "text";
    } else {
      setIconStatus(1);
      passwordInput.type = "password";
    }
  };

  // Form validation
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8000/login",
          formData
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("uname", response.data.uname);
        if (response.status === 200) {
          navigate("/db/dashboard");
        }
        if (response.status === 401 || response.status === 404) {
          // Set password error message
          setErrorMessage("Incorrect password or Username");
        }
        // Clear any existing errors
        setErrors({});
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 404) {
            // Set password error message
            setErrorMessage("Incorrect password or Username");
          } else if (error.response.status === 500) {
            setErrorMessage("Internal Server Error. Please try again later.");
          }
        } else {
          console.error("Error:", error);
        }
      }
    } else {
      // Form validation failed, set errors
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    if (!data.name.trim()) {
      errors.name = "Username is required";
    }
    if (!data.password.trim()) {
      errors.password = "Password is required";
    }
    return errors;
  };
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row pt-5">
          <div className="col-md-6">
            <div className="d-flex justify-content-center">
              <img src="logopng.png" alt="logopng" className="logo" />
            </div>
            <p className="text-center fs-1 myfont">Welcome Back</p>
            <h2 className="text-center mt-3">Login</h2>
            <div className="login-form m-auto mt-5">
              {errorMessage && (
                <div style={{ color: "red" }} className="m-2">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Username"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name}</span>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your Password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <span>
                    <img
                      src={iconStatus === 1 ? "close.svg" : "open.svg"}
                      id="eye"
                      alt="Toggle Password Visibility"
                      onClick={handleClick}
                      className="field-icon"
                    />
                  </span>
                </div>
                <button className="btn btn-primary w-100" type="submit">
                  Login
                </button>
              </form>
              <p className="text-center form-pera mt-4">
                Do not have an account yet?
                <NavLink to="/signup" className="text-primary">
                  Sign up
                </NavLink>
              </p>
            </div>
          </div>
          <div className="col-md-6 d-flex align-content-center">
            <img src="login.svg" alt="login Image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
