import { useEffect, useState } from "react";
import { db } from "../../src/firebase";
import { collection, getDocs, doc, addDoc, updateDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

interface Report {
  id: string;
  item: string;
  description: string;
  location: string;
  date: string;
  status: string;
}

const AdminApproval: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  
  const approveReport = async (reportId: string) => {
    try {
      const reportRef = doc(db, "lost_items", reportId);
      await updateDoc(reportRef, { status: "approved" });
  
      // Push notification for approved report
      await addDoc(collection(db, "notifications"), {
        title: "New Approved Report",
        description: "A new lost item report has been approved.",
        timestamp: new Date(),
      });
  
      alert("✅ Report approved successfully and notification sent!");
    } catch (error) {
      alert("❗ Error approving report.");
    }
  };
  const denyReport = async (reportId: string) => {
    try {
      const reportRefr = doc(db, "lost_items", reportId)
      await updateDoc(reportRefr, {status: "denied"});
    } catch (error) {
      console.error(error);
      alert("Deny error");
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lost_items"));
        const reportData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as Report))
          .filter((report) => report.status === "pendingreport"); // Filter for pending reports

        setReports(reportData);
        setLoading(false);
      } catch (error) {
        console.error("❗ Error fetching reports:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Approval</h1>
      {reports.length === 0 ? (
        <p className="text-center">No pending reports.</p>
      ) : (
        <div className="list-group">
          {reports.map((report) => (
            <div
              key={report.id}
              className="list-group-item list-group-item-action flex-column align-items-start"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{report.item}</h5>
                <small className="text-muted">{report.date}</small>
              </div>
              <p className="mb-1">{report.description}</p>
              <small className="text-muted">
                <strong>Location:</strong> {report.location}
              </small>

              {/* Action Buttons */}
              <div className="mt-3 d-flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => approveReport(report.id)}
                >
                  Approve
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => denyReport(report.id)}
                >
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminApproval;
