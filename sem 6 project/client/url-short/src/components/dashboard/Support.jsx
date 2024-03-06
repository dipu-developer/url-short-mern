import React, { useState } from "react";
import Navslider from "./Navslider";
import DashBoardFooter from "./DashBoardFooter";
import axios from "axios";

const Support = () => {
  const [data, setData] = useState("");
  const token = localStorage.getItem("token");
  const [sucess, setSucess] = useState(false);
  const [failure, setFailure] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data) {
        const response = await axios.post(
          "http://localhost:8000/support",
          { message: data },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setSucess(true);
          setTimeout(() => {
            setSucess(false); // Hide the modal after 3 seconds
          }, 3000);
        } else {
          setFailure(true);
          setTimeout(() => {
            setFailure(false); // Hide the modal after 3 seconds
          }, 3000);
        }
      }else{
        console.log("no message available")
      }
    } catch {
      console.log("server error");
    }
  };
  return (
    <>
      <Navslider />
      <div className="">
        <h2 className="text-center my-5">Supprt</h2>
        <div className="container mt-5">
          <div
            className="modal"
            style={{ display: sucess ? "block" : "none" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Success</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setSucess(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">Url Delete successfully!</div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 px-md-5">
                <textarea
                  className="form-control"
                  id=""
                  rows={5}
                  placeholder="Enter your issue"
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn btn-primary mt-3"
              type="submit"
              disabled={!data}
            >
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
