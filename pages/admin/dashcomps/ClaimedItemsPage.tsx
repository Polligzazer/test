import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../src/firebase";
import { Link } from "react-router-dom";

const ClaimedItemsPage = () => {
  const [claimedItems, setClaimedItems] = useState<number>(0);

  useEffect(() => {
    const fetchClaimedItems = async () => {
      try {
        const q = query(collection(db, "lost_items"), where("status", "==", "claimed"));
        const snapshot = await getDocs(q);
        setClaimedItems(snapshot.size);
      } catch (error) {
        console.error("Error fetching claimed items:", error);
      }
    };

    fetchClaimedItems();
  }, []);

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center text-center">
      <div>
        <h1 className="mb-4">Claimed Items</h1>
        <h2 className="display-4">{claimedItems}</h2>
        <Link to="/dashboard" className="btn btn-secondary mt-3">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ClaimedItemsPage;
