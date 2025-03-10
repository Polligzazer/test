import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../src/firebase";
import { getAuth, signOut } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      alert("Error logging out");
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      const q = query(collection(db, "lost_items"), where("status", "==", "approved"));
      const querySnapshot = await getDocs(q);
      setReports(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchReports();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        <button onClick={() => navigate("/report")} className="bg-blue-500 text-white px-4 py-2 rounded">Report Items</button>
      </div>
      <h1>User Home</h1>
      <h2>Lost Item Reports</h2>
      {reports.length === 0 ? <p>No reports found.</p> : (
        <ul>
          {reports.map(report => (
            <li key={report.id}>
              <h3>{report.category}</h3>
              <p>{report.description}</p>
              <p>Location: {report.location}</p>
              <p>Date: {report.date}</p>
              {/* <img src={report.imageUrl} alt="Lost item" width="200" /> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;