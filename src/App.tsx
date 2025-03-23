import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import AdminLayout from "../components/admin/AdminLayout";
import Signup from "../components/signup";
import Login from "../components/login";
import ResetPassword from "../components/resetpassword";
import VerifyEmail from "../components/veifyemail";
import EmailVerified from "../components/emailverified";
import CompleteRegistration from "../components/CompleteRegistration";
import Home from "../pages/home";
import Report from "../pages/report";
import ItemHistory from "../pages/ItemHistory";
import AdminHome from "../pages/admin/adminhome";
import AdminApproval from "../pages/admin/AdminApproval";
import Dashboard from "../pages/admin/Dashboard";
import AdminReport from "../pages/admin/AdminReport";
import UserList from "../pages/admin/UserList";
import Lost from "../pages/report/reports/Lost";
import Found from "../pages/report/reports/Found";
import Claim from "../pages/report/reports/Claim";

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
          <Route path="/report/lost" element={<Lost />} />
          <Route path="/report/claim" element={<Claim />} />
          <Route path="/report/found" element={<Found />} />
          <Route path="/item-history" element={<ItemHistory />} />
        </Route>
        <Route
         element={<AdminLayout />}
        >
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/adminreport" element={<AdminReport />} />
          <Route path="/approval" element={<AdminApproval />} />
          <Route path="/user-list" element={<UserList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
