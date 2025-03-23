import { useState } from "react";
import ReportForms from "../report/ReportForms";
import PendingClaims from "../report/PendingClaims";
import Claimed from "../report/Claimed";

const AdminReport = () => {
  const [activeTab, setActiveTab] = useState("reportForms");

  const renderContent = () => {
    switch (activeTab) {
      case "reportForms":
        return <ReportForms />;
      case "pendingClaims":
        return <PendingClaims />;
      case "claimed":
        return <Claimed />;
      default:
        return <ReportForms />;
    }
  };

  const getHeadingText = () => {
    switch (activeTab) {
      case "reportForms":
        return "Report Lost Item";
      case "pendingClaims":
        return "Pending Claims";
      case "claimed":
        return "Claimed Items";
      default:
        return "Report Lost Item";
    }
  };


  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center pt-5">
        <h1 className="text-center">{getHeadingText()}</h1>
        <div className="">
          <button className={`btn ${activeTab === "reportForms" ? "btn-primary" : "btn-outline-primary"} border-0`}
            onClick={() => setActiveTab("reportForms")}
          >
            Report Forms
          </button>
          <button className={`btn ${activeTab === "pendingClaims" ? "btn-primary" : "btn-outline-primary"} border-0`}
            onClick={() => setActiveTab("pendingClaims")}
          >
            Pending Claims
          </button>
          <button className={`btn ${activeTab === "claimed" ? "btn-primary" : "btn-outline-primary"} border-0`}
            onClick={() => setActiveTab("claimed")}
          >
            Claimed
          </button>
        </div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default AdminReport;
