import React, { useState } from "react";
import Navslider from "./Navslider";
import DashBoardFooter from "./DashBoardFooter";

const Withdraw = () => {
  const [earn,setEarn] = useState(0)
  let ern = localStorage.getItem('totalern')
  return (
    <>
    <Navslider/>
      <div className="">
        <h2 className="text-center my-5">Withdraw</h2>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 col-sm-12 mt-4">
              <div className="details-ern bg-success p-4 text-white rounded">
                <div className="earn fs-2">
                ₹  <span>0.00</span>
                </div>
                <div className="info fs-5">Available balance</div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 mt-4">
              <div className="details-ern bg-primary p-4 text-white rounded">
                <div className="earn fs-2">
                ₹  <span>{ern/2}</span>
                </div>
                <div className="info fs-5">Total Earn</div>
              </div>
            </div>
          </div>
          <button className="btn btn-success mt-5">Withdraw</button>
          <p className="mt-3 ">
            The payment is then sent to your withdraw account during business
            days no longer than 2 days after requesting. Please do not contact
            us regarding payments before due dates. <br />
            In order to receive your payments you need to fill your payment
            method and payment ID here if you haven't done so. You are also
            requested to fill all the required fields in the{" "}
            <b> Account Details </b> section with accurate data.
          </p>
        </div>
        <footer className="  ">
          <div className="container-fluid bg-dark text-white py-3 d-fix-footer">
            <div className="">
              <p className="text-center">
                © 2024 Shortly | Develop By <a href="">Deepak Sharma</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
      <DashBoardFooter/>
    </>
  );
};

export default Withdraw;
