import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../src/firebase"; // Import your Firebase config
import { Link } from "react-router-dom";


const TotalReportsPage = () => {
  const [totalReports, setTotalReports] = useState<number>(0);

  // Fetch total reports from Firestore
  useEffect(() => {
    const fetchTotalReports = async () => {
      try {
        const reportsCollection = collection(db, "lost_items");
        const snapshot = await getDocs(reportsCollection);
        setTotalReports(snapshot.size); // Counts total reports
      } catch (error) {
        console.error("Error fetching total reports:", error);
      }
    };

    fetchTotalReports();
  }, []);

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center text-center">
      <div>
        <h1 className="mb-4">Total Reports</h1>
        <h2 className="display-4">{totalReports}</h2>
        <Link to="/dashboard" className="btn btn-secondary mt-3">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default TotalReportsPage;
