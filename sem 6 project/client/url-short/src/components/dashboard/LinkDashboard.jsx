import React, { useState, useEffect } from "react";
import DashBoardFooter from "./DashBoardFooter";
import Navslider from "./Navslider";
// import axios from "../Services/axiosIntercept";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LinkDashboard = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [ShowDelete, setShowDelete] = useState(false);
  if (!token) {
    navigate("/login");
  }
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/urldata", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError("URL cannot be empty");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/",
        { url },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchData();
      }
      setError("");
    } catch (error) {
      setError("Invalid URL or server error");
    }
  };

  const handleDeleteRow = async ( id) => {
    try {
      const response=await axios.delete(`http://localhost:8000/deleteurl/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      // After deleting, fetch data again to update the table
      if (response.status === 200) {
        setShowDelete(true); // Show the modal
    setTimeout(() => {
      setShowDelete(false); // Hide the modal after 3 seconds
    }, 3000);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return { date: formattedDate, time: formattedTime };
  };
  const handleCopyName = (name) => {
    navigator.clipboard.writeText(name);
    setShowModal(true); // Show the modal
    setTimeout(() => {
      setShowModal(false); // Hide the modal after 3 seconds
    }, 3000);
  };
  return (
    <>
      <Navslider />
      <div>
        <h2 className="text-center my-5">Link</h2>
        <div className="container">

        <div
            className="modal"
            style={{ display: ShowDelete ? "block" : "none" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Success</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">Url Delete successfully!</div>
              </div>
            </div>
          </div>


          <div
            className="modal"
            style={{ display: showModal ? "block" : "none" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Success</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => setShowModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">Copied successfully!</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="d-flex input-box m-auto ">
              <input
                type="text"
                className="form-control d-inline-block"
                placeholder="Enter URL"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary d-inline-block p-3"
              >
                Short
              </button>
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </form>
        </div>
        <div className="container my-5" style={{ overflowX: "auto" }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Redirect</th>
                <th scope="col">Shorten</th>
                <th scope="col">Copy</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  {/* <td>{item.updatedAt}</td> */}
                  <td>{formatDateString(item.updatedAt).date}</td>
                  <td>{formatDateString(item.updatedAt).time}</td>
                  <td>{item.redirectUrl}</td>
                  <td>{item.shorturl}</td>
                  <td className="table-btn">
                    <i
                      className="bx bx-copy"
                      onClick={() =>
                        handleCopyName("http://localhost:8000/" + item.shorturl)
                      }
                      data-toggle="modal"
                      data-target="#exampleModalLong"
                    ></i>
                  </td>
                  <td className="table-btn text-success ">
                    <i className="bx bx-edit-alt"></i>
                  </td>
                  <td className="table-btn text-danger ">
                    <form action="">
                      <i
                        className="bx bx-checkbox-minus"
                        type="submit"
                        onClick={() => handleDeleteRow(item._id)}
                      ></i>
                    </form>
                  </td>
                </tr>
              ))}

              <tr>
                <td>12-01-2012</td>
                <td>www.google.com</td>
                <td>http://shortly.com/KhmnF</td>
                <td className="table-btn">
                  <i className="bx bx-copy"></i>
                </td>
                <td className="table-btn text-success ">
                  <i className="bx bx-edit-alt"></i>
                </td>
                <td className="table-btn text-danger ">
                  <i className="bx bx-checkbox-minus"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <DashBoardFooter />
    </>
  );
};

export default LinkDashboard;
