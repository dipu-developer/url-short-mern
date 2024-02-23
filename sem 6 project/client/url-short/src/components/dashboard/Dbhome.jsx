import React,{useState, useEffect} from "react";
import Navslider from "./Navslider";
import DashBoardFooter from "./DashBoardFooter";
import axios from 'axios';

const Dbhome = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://your-express-server-url/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
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
                  $ <span>0</span>
                </div>
                <div className="info fs-5">Total views</div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 mt-4 ">
              <div className="details-ern bg-primary p-4 text-white rounded">
                <div className="earn fs-2">
                  $ <span>0.00</span>
                </div>
                <div className="info fs-5">Total Earning</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Views</th>
                <th scope="col">Link Earn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12-01-2012</td>
                <td>1256</td>
                <td>$656</td>
              </tr>
              {data.map(item => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.views}</td>
              <td>{item.name}</td>
            </tr>
          ))}
              <tr>
                <td>12-01-2012</td>
                <td>6352</td>
                <td>$856</td>
              </tr>
              <tr>
                <td>12-01-2012</td>
                <td>5236</td>
                <td>$656</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <DashBoardFooter />
    </>
  );
};

export default Dbhome;
