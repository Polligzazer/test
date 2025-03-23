import { useState, useEffect } from "react";
import { db } from "../../../src/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import fetchUserUID from "../../../components/fetchUserUID";
import { useNavigate } from "react-router-dom";


const Lost: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    item: "",
    category: "",
    description: "",
    location: "",
    date: "",
  });

  const [userUID, setUserUID] = useState<string | null>(null);

  useEffect(() => {
    const getUserUID = async () => {
      const uid = await fetchUserUID();
      if (uid) {
        setUserUID(uid);
      } else {
        console.error("❗ Failed to fetch UID.");
      }
    };

    getUserUID();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userUID) {
      alert("❗ User not authenticated. Please log in again.");
      return;
    }

    const reportData = {
      ...formData,
      status: "pendingreport",
      type: "lost",
      userId: userUID,
      reportId: `LST-${Date.now()}`,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "lost_items"), reportData);
      alert("✅ Lost item report submitted successfully!");
    } catch (error) {
      console.error("🔥 Error submitting report:", error);
      alert("❗ Error submitting report. Please try again.");
    }
  };

  return (
    <div className="container pt-5">
      <h1 className="text-center mb-4">Report Lost Item</h1>
      <button 
      className="btn btn-secondary mb-3" 
      onClick={() => navigate("/report")}
    >
      ← Back to Report
    </button>
      <form className="bg-light p-4 rounded shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input
            type="text"
            className="form-control"
            name="item"
            value={formData.item}
            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Accessories/Personal Belongings">Accessories/Personal Belongings</option>
            <option value="School Belongings">School Belongings</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Lost</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default Lost;
