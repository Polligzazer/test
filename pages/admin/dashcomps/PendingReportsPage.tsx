import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../src/firebase";
import { Link } from "react-router-dom";


const PendingReportsPage = () => {
  const [pendingReports, setPendingReports] = useState<number>(0);

  useEffect(() => {
    const fetchPendingReports = async () => {
      try {
        const q = query(collection(db, "lost_items"), where("status", "==", "pending"));
        const snapshot = await getDocs(q);
        setPendingReports(snapshot.size);
      } catch (error) {
        console.error("Error fetching pending reports:", error);
      }
    };

    fetchPendingReports();
  }, []);

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center text-center">
      <div>
        <h1 className="mb-4">Pending Reports</h1>
        <h2 className="display-4">{pendingReports}</h2>
        <Link to="/dashboard" className="btn btn-secondary mt-3">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PendingReportsPage;
