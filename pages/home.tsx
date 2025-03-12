import Route, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../src/firebase";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const q = query(collection(db, "lost_items"), where("status", "==", "approved"));
      const querySnapshot = await getDocs(q);
      setReports(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchReports();
  }, []);

  return (
    <div>
      <div className="p-5">
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
    </div>
  );
};

export default Home;