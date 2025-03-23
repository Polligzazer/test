import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../src/firebase";
import { getAuth } from "firebase/auth";

const PendingReports = () => {
  const [pendingReports, setPendingReports] = useState<any[]>([]);
  const auth = getAuth(); // Firebase Auth for current user

  useEffect(() => {
    const fetchPendingReports = async () => {
      if (!auth.currentUser) return; // Ensure user is authenticated

      try {
        const q = query(
          collection(db, "lost_items"),
          where("userId", "==", auth.currentUser.uid), // Filter by logged-in user
          where("status", "==", "pending")             // Filter pending reports
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const reportsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPendingReports(reportsData);
        } else {
          setPendingReports([]); // No reports found
        }
      } catch (error) {
        console.error("Error fetching pending reports:", error);
      }
    };

    fetchPendingReports();
  }, [auth.currentUser]); // Re-fetch if user changes

  return (
    <div>
      {pendingReports.length === 0 ? (
        <p className="alert alert-warning">No pending reports found.</p>
      ) : (
        <ul className="list-group">
          {pendingReports.map((report) => (
            <li key={report.id} className="list-group-item">
              <h5 className="fw-bold">{report.description}</h5>
              <p>
                <strong>Location:</strong> {report.location}
              </p>
              <p>
                <strong>Date:</strong> {report.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingReports;
