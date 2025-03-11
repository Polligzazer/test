import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Signup from "../components/signup";
import Login from "../components/login";
import ResetPassword from "../components/resetpassword";
import VerifyEmail from "../components/veifyemail";
import EmailVerified from "../components/emailverified";
import CompleteRegistration from "../components/CompleteRegistration";
import Home from "../pages/home";
import AdminHome from "../pages/adminhome";
import Report from "../pages/report";
import AdminApproval from "../pages/AdminApproval";
import ItemHistory from "../pages/ItemHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/complete-registration" element={<CompleteRegistration />} />
        <Route
          element={<Layout />}
        >
          <Route path="/home" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/item-history" element={<ItemHistory />} />
        </Route>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/reportapproval" element={<AdminApproval />} />
      </Routes>
    </Router>
  );
}

export default App;
