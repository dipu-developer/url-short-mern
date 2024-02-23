import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";
import Login from "./components/home/Login.jsx";
import Signup from "./components/home/Signup.jsx";
import Home from "./components/home/Home.jsx";
import LinkDashboard from "./components/dashboard/LinkDashboard.jsx";
import ProfileDashboard from "./components/dashboard/ProfileDashboard.jsx";
import Withdraw from "./components/dashboard/Withdraw.jsx";
import Support from "./components/dashboard/Support.jsx";
import Dbhome from "./components/dashboard/Dbhome.jsx";
import ProtectedRoutes from "./components/Services/ProtectedRoutes.js";

function App() {
  return (
    <>
      <Routes>

        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />

       
        <Route exact path="/db" element={<ProtectedRoutes />}>
          <Route exact path="/db/dashboard" element={<Dbhome />} />
          <Route exact path="/db/links" element={<LinkDashboard />} />
          <Route exact path="/db/profile" element={<ProfileDashboard />} />
          <Route exact path="/db/withdraw" element={<Withdraw />} />
          <Route exact path="/db/support" element={<Support />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
