import React from "react";
import Navslider from "./Navslider";
import DashBoardFooter from "./DashBoardFooter";

const Support = () => {
  return (
    <>
      <Navslider />
      <div className="">
        <h2 className="text-center my-5">Supprt</h2>
        <div className="container mt-5">
          <form action="" method="post">
            <div className="row">
              <div className="col-12 px-md-5">
                <textarea
                  className="form-control"
                  id=""
                  rows={5}
                  placeholder="Enter your issue"
                  defaultValue={""}
                />
              </div>
            </div>
            <button className="btn btn-primary mt-3">
              Send Mail <i className="bx bx-mail-send fs-6" />
            </button>
          </form>
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

      <DashBoardFooter />
    </>
  );
};

export default Support;
