import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";

const Topbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      navigate("/");
    } catch (error) {
      alert("Error logging out");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <button
            className="btn btn-light me-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <a className="navbar-brand" onClick={() => navigate("/")}>
            Lost & Found
          </a>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`offcanvas offcanvas-start ${sidebarOpen ? "show" : ""}`}
        style={{ width: "250px" }}
      >
        <div className="offcanvas-header bg-primary text-white">
          <h5 className="offcanvas-title">FLO</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setSidebarOpen(false)}
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column h-100">
          <ul className="nav flex-column w-100">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active text-primary fw-bold" : ""}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/report"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active text-primary fw-bold" : ""}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                Report
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/item-history"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active text-primary fw-bold" : ""}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                Item History
              </NavLink>
            </li>
          </ul>

          {/* Logout Button at Bottom */}
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="btn btn-danger w-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
