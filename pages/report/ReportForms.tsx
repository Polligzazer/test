import { useNavigate } from "react-router-dom";

const ReportForms: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="row text-center">
        <h1 className="mb-4">What would you like to report?</h1>

        <div className="col-md-4 mb-3">
          <button
            className="btn btn-primary btn-lg w-100 py-3"
            onClick={() => navigate("/report/lost")}
          >
            Report Lost Item
          </button>
        </div>

        <div className="col-md-4 mb-3">
          <button
            className="btn btn-success btn-lg w-100 py-3"
            onClick={() => navigate("/report/found")}
          >
            Report Found Item
          </button>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-warning btn-lg w-100 py-3"
            onClick={() => navigate("/report/claim")}
          >
            Report Claim Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportForms;
