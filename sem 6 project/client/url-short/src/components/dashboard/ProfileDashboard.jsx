import React, { useState } from "react";
import Navslider from "./Navslider";
import DashBoardFooter from "./DashBoardFooter";
import axios from "axios";

const ProfileDashboard = () => {
  const token = localStorage.getItem("token");
  const [showInformation, setshowInformation] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    ifsc: "",
    account: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8000/profiledata",
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setshowInformation(true); // Show the modal
            setTimeout(() => {
              setshowInformation(false); // Hide the modal after 3 seconds
            }, 3000);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!formData.fname) {
      formIsValid = false;
      errors.fname = "First name is required";
    }
    if (!formData.lname) {
      formIsValid = false;
      errors.lname = "Last name is required";
    }

    if (!formData.city) {
      formIsValid = false;
      errors.city = "City is required";
    } else if (!/^[a-zA-Z\s]*$/.test(formData.city)) {
      formIsValid = false;
      errors.city = "City must contain only letters and spaces";
    }

    if (!formData.state) {
      formIsValid = false;
      errors.state = "State is required";
    }

    if (!formData.zip) {
      formIsValid = false;
      errors.zip = "Zip is required";
    } else if (!/^\d{1,6}$/i.test(formData.zip)) {
      formIsValid = false;
      errors.zip = "Zip must be an integer with a maximum length of 6";
    }

    if (!formData.phone) {
      formIsValid = false;
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/i.test(formData.phone)) {
      formIsValid = false;
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.ifsc) {
      formIsValid = false;
      errors.ifsc = "ifsc number is required";
    }

    if (!formData.account) {
      formIsValid = false;
      errors.account = "Account number is required";
    } else if (isNaN(formData.account)) {
      formIsValid = false;
      errors.account = "Account number must be a number";
    }

    setErrors(errors);
    return formIsValid;
  };
  return (
    <>
      <Navslider />
      <div className="container mt-5">
        <h2 className="text-center my-5">Profile</h2>
        <div class="alert alert-primary" role="alert" style={{ display: showInformation ? "block" : "none" }}>
          Data Add Sucessfully
        </div>
        <h3 className="mt-3">Account Details &amp; Personal Information</h3>
        <form id="detailform" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="First Name"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
              />
              {errors.fname && <span>{errors.fname}</span>}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Last Name"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
              />
              {errors.lname && <span>{errors.lname}</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="City"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
              {errors.city && <span>{errors.city}</span>}
            </div>
            <div className="col-md-6">
              <select
                className="mt-3 form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              >
                <option disabled="" selected="">
                  State
                </option>
                <option value="AP">Andhra Pradesh</option>
                <option value="AR">Arunachal Pradesh</option>
                <option value="AS">Assam</option>
                <option value="BR">Bihar</option>
                <option value="CT">Chhattisgarh</option>
                <option value="GA">Gujarat</option>
                <option value="HR">Haryana</option>
                <option value="HP">Himachal Pradesh</option>
                <option value="JK">Jammu and Kashmir</option>
                <option value="GA">Goa</option>
                <option value="JH">Jharkhand</option>
                <option value="KA">Karnataka</option>
                <option value="KL">Kerala</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="MH">Maharashtra</option>
                <option value="MN">Manipur</option>
                <option value="ML">Meghalaya</option>
                <option value="MZ">Mizoram</option>
                <option value="NL">Nagaland</option>
                <option value="OR">Odisha</option>
                <option value="PB">Punjab</option>
                <option value="RJ">Rajasthan</option>
                <option value="SK">Sikkim</option>
                <option value="TN">Tamil Nadu</option>
                <option value="TG">Telangana</option>
                <option value="TR">Tripura</option>
                <option value="UT">Uttarakhand</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="WB">West Bengal</option>
                <option value="AN">Andaman and Nicobar Islands</option>
                <option value="CH">Chandigarh</option>
                <option value="DN">Dadra and Nagar Haveli</option>
                <option value="DD">Daman and Diu</option>
                <option value="DL">Delhi</option>
                <option value="LD">Lakshadweep</option>
                <option value="PY">Puducherry</option>
              </select>
              {errors.state && <span>{errors.state}</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Zip"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
              />
              {errors.zip && <span>{errors.zip}</span>}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Phone Number"
                id="pnumber"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="IFSC CODE"
                name="ifsc"
                value={formData.ifsc}
                onChange={handleInputChange}
              />
              {errors.ifsc && <span>{errors.ifsc}</span>}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Account Number"
                id="account"
                name="account"
                value={formData.account}
                onChange={handleInputChange}
              />
              {errors.account && <span>{errors.account}</span>}
            </div>
          </div>
          <button className="btn btn-primary mt-3" id="submitbtn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <DashBoardFooter />
    </>
  );
};

export default ProfileDashboard;
