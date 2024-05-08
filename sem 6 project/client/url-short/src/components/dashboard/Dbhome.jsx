import React, { useState, useEffect } from "react";
import Navslider from "./Navslider";
import DashBoardFooter from "./DashBoardFooter";
import axios from "axios";

// const Dbhome = () => {
//   const [totalVisitorHistory, setTotalVisitorHistory] = useState(0);
//   const token = localStorage.getItem("token");
//   const [data, setData] = useState([]);
//   const [personal, setPersonal] = useState([]);
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/dashboard", {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });
//       setData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     const PersonalData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/getdetails", {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         });
//         console.log(response.data.data[0]); // Unused variable, can be removed
//         setPersonal(response.data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     PersonalData();
//   }, []);

//   useEffect(() => {
//     const totalCount = data.reduce(
//       (acc, item) => acc + item.visitorHistory.length,
//       0
//     );
//     setTotalVisitorHistory(totalCount);
//     fetchData();
//   }, [data]);

//   return (
//     <>
//       <Navslider />
//       <div className=" ">
//         <h2 className="text-center my-5">Dashboard</h2>
//         <div className="container mt-5 ">
//           <div className="row">
//             <div className="col-md-6 col-sm-12 mt-4 ">
//               <div className="details-ern bg-success p-4 text-white rounded  ">
//                 <div className="earn fs-2">
//                   <span>{totalVisitorHistory}</span>
//                 </div>
//                 <div className="info fs-5">Total views</div>
//               </div>
//             </div>
//             <div className="col-md-6 col-sm-12 mt-4 ">
//               <div className="details-ern bg-primary p-4 text-white rounded">
//                 <div className="earn fs-2">
//                   ₹ <span>{totalVisitorHistory / 2}</span>
//                 </div>
//                 <div className="info fs-5">Total Earning</div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="container mt-5" style={{ overflowX: "auto" }}>
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th scope="col">Link</th>
//                 <th scope="col">Views</th>
//                 <th scope="col">Earn</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 <tr key={item._id}>
//                   <td>{item.redirectUrl}</td>
//                   <td>{item.visitorHistory.length}</td>
//                   <td>{item.visitorHistory.length / 2}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="container my">
//           <h2>Information</h2>
//           <p>
//             <span className="heading"> Name: </span>Deepak Sharma
//           </p>
//           <p>
//             <span className="heading"> Address: </span>Valsad -396165 Gujrat
//           </p>
//           <p>
//             <span className="heading"> Phone Number: </span>9173556102
//           </p>
//           <p>
//             <span className="heading"> Account Number: </span>0989098908
//           </p>
//           <p>
//             <span className="heading"> IFSC Code: </span>Airp098909
//           </p>
//         </div>
//         </div>

//       </div>

//       <DashBoardFooter />
//     </>
//   );
// };

const Dbhome = () => {
  const [totalVisitorHistory, setTotalVisitorHistory] = useState(0);
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [personal, setPersonal] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/dashboard", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await axios.get("http://localhost:8000/getdetails", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }); // Unused variable, can be removed
        setPersonal(response.data.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Clean-up function to prevent memory leaks
    return () => {
      // Add any cleanup logic here if needed
    };
  }, [token]); // Only run the effect when the token changes

  useEffect(() => {
    const totalCount = data.reduce(
      (acc, item) => acc + item.visitorHistory.length,
      0
    );
    setTotalVisitorHistory(totalCount);
    localStorage.setItem("totalern", totalVisitorHistory);
  }, [data]);

  return (
    <>
      <Navslider />
      <div className=" ">
        <h2 className="text-center my-5">Dashboard</h2>
        <div className="container mt-5 ">
          <div className="row">
            <div className="col-md-6 col-sm-12 mt-4 ">
              <div className="details-ern bg-success p-4 text-white rounded  ">
                <div className="earn fs-2">
                  <span>{totalVisitorHistory}</span>
                </div>
                <div className="info fs-5">Total views</div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 mt-4 ">
              <div className="details-ern bg-primary p-4 text-white rounded">
                <div className="earn fs-2">
                  ₹ <span>{totalVisitorHistory / 2}</span>
                </div>
                <div className="info fs-5">Total Earning</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5" style={{ overflowX: "auto" }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Link</th>
                <th scope="col">Views</th>
                <th scope="col">Earn</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.redirectUrl}</td>
                  <td>{item.visitorHistory.length}</td>
                  <td>{item.visitorHistory.length / 2}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="container my">
            <h2>Information</h2>
            <p>
              <span className="heading"> Name: </span>
              {personal.fname ? (
                <span>{personal.fname.toUpperCase()}</span>
              ) : (
                <span>User</span>
              )}{" "}
              {personal.lname ? (
                <span>{personal.lname.toUpperCase()}</span>
              ) : (
                <span>User</span>
              )}{" "}
            </p>
            <p>
              <span className="heading"> Address: </span>{personal.city ?( personal.city.toUpperCase()):""} - {personal.zip} 
            </p>
            <p>
              <span className="heading"> Phone Number: </span>{personal.phone}
            </p>
            <p>
              <span className="heading"> Account Number: </span>{personal.account}
            </p>
            <p>
              <span className="heading"> IFSC Code: </span>{personal.ifsc}
            </p>
          </div>
        </div>
      </div>

      <DashBoardFooter />
    </>
  );
};

export default Dbhome;
