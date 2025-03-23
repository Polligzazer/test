import { useState, useEffect } from "react";
import { db } from "../../../src/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import fetchUserUID from "../../../components/fetchUserUID";
import { useNavigate } from "react-router-dom";


const Claim: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item: "",
    claimReason: "",
    contactInfo: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userUID) {
      alert("❗ User not authenticated. Please log in again.");
      return;
    }

    const reportData = {
      ...formData,
      status: "pendingclaim",
      type: "claim",
      userId: userUID,
      reportId: `CLM-${Date.now()}`,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "reported_items"), reportData);
      alert("✅ Claim item report submitted successfully!");
    } catch (error) {
      console.error("🔥 Error submitting report:", error);
      alert("❗ Error submitting report. Please try again.");
    }
  };

  return (
    <div className="container pt-4">
      <h1 className="text-center mb-4">Report Claim Item</h1>
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
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Reason for Claim</label>
          <textarea
            className="form-control"
            rows={3}
            name="claimReason"
            value={formData.claimReason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Information</label>
          <input
            type="text"
            className="form-control"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Claim
        </button>
      </form>
    </div>
  );
};

export default Claim;
