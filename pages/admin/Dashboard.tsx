import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../src/firebase";
import Analytics from "../../components/admin/Analytics";
import TotalReportsPage from "./dashcomps/TotalReportsPage";
import PendingReportsPage from "./dashcomps/PendingReportsPage";
import ClaimedItemsPage from "./dashcomps/ClaimedItemsPage";

const DashboardHome = () => {
  const [totalReports, setTotalReports] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);
  const [claimedItems, setClaimedItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Total Reports
        const totalReportsSnapshot = await getDocs(collection(db, "lost_items"));
        setTotalReports(totalReportsSnapshot.size);

        // Pending Reports
        const pendingQuery = query(
          collection(db, "lost_items"),
          where("status", "==", "pending")
        );
        const pendingSnapshot = await getDocs(pendingQuery);
        setPendingReports(pendingSnapshot.size);

        // Claimed Items
        const claimedQuery = query(
          collection(db, "lost_items"),
          where("status", "==", "claimed")
        );
        const claimedSnapshot = await getDocs(claimedQuery);
        setClaimedItems(claimedSnapshot.size);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container pt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <div className="row justify-content-between my-4">
        <Link to="totalReports" className="col-md-3 bg-primary text-white text-center p-3 mx-2">
          <h3>Pending Reports</h3>
          <h2>{pendingReports}</h2> {/* Display static or dynamic data */}
        </Link>

        {/* Pending Reports Card */}
        <Link to="pendingReports" className="col-md-3 bg-warning text-dark text-center p-3 mx-2">
          <h3>Pending Claims</h3>
          <h2>{pendingReports}</h2>
        </Link>

        {/* Claimed Items Card */}
        <Link to="claimedItems" className="col-md-3 bg-success text-white text-center p-3 mx-2">
          <h3>Claimed Items</h3>
          <h2>{claimedItems}</h2>
        </Link>
      </div>


      <Analytics />

    </div>
  );
};

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="totalReports" element={<TotalReportsPage />} />
      <Route path="pendingReports" element={<PendingReportsPage />} />
      <Route path="claimedItems" element={<ClaimedItemsPage />} />
    </Routes>
  );
};
export default Dashboard;
