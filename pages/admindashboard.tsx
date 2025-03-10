import React, { useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../src/firebase";

const AdminDashboard = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchPendingReports = async () => {
      const q = query(collection(db, "lost_items"), where("status", "==", "pending"));
      const querySnapshot = await getDocs(q);
      setReports(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchPendingReports();
  }, []);

  const handleApproval = async (id: string, status: "approved" | "denied") => {
    try {
      const reportRef = doc(db, "lost_items", id);
      await updateDoc(reportRef, { status });
      setReports(reports.filter(report => report.id !== id));
      alert(`Report ${status}`);
    } catch (error) {
      alert("Error updating report status");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard - Approve Reports</h2>
      {reports.length === 0 ? (
        <p>No pending reports.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map(report => (
            <li key={report.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-bold">{report.category}</h3>
              <p>{report.description}</p>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Date:</strong> {report.date}</p>
              {/* <img src={report.imageUrl} alt="Lost item" width="200" className="mt-2 rounded" /> */}
              <div className="flex space-x-2 mt-2">
                <button onClick={() => handleApproval(report.id, "approved")} className="bg-green-500 text-white px-4 py-2 rounded">Approve</button>
                <button onClick={() => handleApproval(report.id, "denied")} className="bg-red-500 text-white px-4 py-2 rounded">Deny</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;