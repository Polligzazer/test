import React, { useState } from "react";
import { reportLostItem } from "../src/firebase";

const Report = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  // const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!image) return alert("Please upload an image");
    setLoading(true);
    try {
      await reportLostItem("userId", category, description, location, date);
      // await reportLostItem("userId", category, description, location, date, image);
      alert("Report submitted successfully");
    } catch (error) {
      alert("Error submitting report");
      console.error("Firestore Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-center">Report Lost Item</h1>
        <div className="">
          <button className="btn border-0">
            <a href="" className="text-decoration-none fw-normal">Report forms</a>
          </button>
          <button className="btn border-0">
            <a href="" className="text-decoration-none fw-normal">Pending claims</a>
          </button>
          <button className="btn btn-outline-primary border-0">
            <a href="" className="text-decoration-none fw-normal">Claimed</a>
          </button>
        </div>
      </div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Lost Item" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-100 p-2 border rounded" />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-100 p-2 border rounded" />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-100 p-2 border rounded" />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-100 p-2 border rounded" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-100 p-2 border rounded" />
          {/* <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required className="w-full p-2 border rounded" /> */}
          <button type="submit" disabled={loading} className="bg-primary text-light py-2 rounded">{loading ? "Submitting..." : "Submit Report"}</button>
        </form>
      </div>
    </div>
  );
};

export default Report;
