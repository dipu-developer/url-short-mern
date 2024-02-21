import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [iconStatus, setIconStatus] = useState(1);

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

  // form validation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [termsChecked, setTermsChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0 && termsChecked) {
      try {
        const response = await fetch("http://localhost:8000/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Data sent successfully");
          // Reset form data
          setFormData({
            name: "",
            email: "",
            password: "",
          });
          // Clear any existing errors
          setErrors({});
        } else {
          throw new Error("Failed to send data");
        }
      } catch (error) {
        console.error("Error:", error.message);
        // Handle error
      }
    } else {
      const newErrors = { ...validationErrors };
      if (!termsChecked) {
        newErrors.terms = "Please accept the terms and conditions";
      }
      // Form validation failed, set errors
      setErrors(newErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else if (!isValidName(data.name)) {
      errors.name = "Name must contain only alphanumeric characters";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  const isValidName = (name) => {
    const namePattern = /^[a-zA-Z0-9]*$/;
    return namePattern.test(name);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleCheckboxChange = (e) => {
    setTermsChecked(e.target.checked);
  };
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row py-5">
          <div className="col-md-6">
            <div className="d-flex justify-content-center">
              <img src="logopng.png" alt="logopng" className="logo" />
            </div>
            <p className="text-center fs-1 myfont">Welcome</p>
            <div className="login-form m-auto mt-5">
              <h2 className="text-center">Sign Up</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Username"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name}</span>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email}</span>
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
                  {errors.password && (
                    <span style={{ color: "red" }}>{errors.password}</span>
                  )}
                </div>
                <input
                  type="checkbox"
                  name="terms"
                  checked={termsChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="accept">Accept all term and condions</label>
                {errors.terms && (
                  <span style={{ color: "red" }}>{errors.terms}</span>
                )}
                <button className="btn btn-primary w-100 mt-3" type="submit">
                  Login
                </button>
              </form>
              <p className="text-center form-pera mt-4">
                Have an account?{" "}
                <NavLink to="/login" className="text-primary">
                  Login In
                </NavLink>
              </p>
            </div>
          </div>
          <div className="col-md-6 d-flex align-content-center">
            <img src="signup.svg" alt="login Image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
