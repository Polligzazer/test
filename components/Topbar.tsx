import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../src/firebase";
import { getAuth, signOut } from "firebase/auth";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const Topbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      orderBy("timestamp", "desc")
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(newNotifications);
      setNotifications(newNotifications);
    });
  
    return () => unsubscribe();
  }, []);

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
      <nav className="navbar navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <div className="align-items-center d-flex">
            <button
              className="btn btn-light me-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <a className="navbar-brand" onClick={() => navigate("/home")}>
              Lost & Found
            </a>
          </div>
          <form action="" className="d-flex gap-3 align-items-center">
            <input type="search" name="search" id="search" className="bg-light text-dark border-0 rounded-5 px-3 py-1" placeholder="Search..." />
            <button type="submit" className="btn btn-light ">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <div className="d-flex me-4 gap-5 position-relative align-items-center">
            {/* Notification Icon with Badge */}
            <div className="dropdown position-relative">
              <a
                className="position-relative"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-bell text-light fs-3"></i>
                {notifications.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {notifications.length}
                  </span>
                )}
              </a>

              <ul className="dropdown-menu dropdown-menu-end px-2 py-3" style={{ width: "300px" }}>
                <li className="dropdown-header text-primary fw-bold fs-5">Notifications</li>

                {notifications.length === 0 ? (
                  <li className="dropdown-item text-center">No new notifications</li>
                ) : (
                  notifications.map((notif) => (
                    <li key={notif.id} className="dropdown-item">
                      <strong>{notif.title}</strong>
                      <p className="small m-0">{notif.description}</p>
                      <small className="text-muted">
                      {new Date(notif.timestamp.seconds * 1000).toLocaleString()}
                      </small>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Profile Icon */}
            <a>
              <i className="bi bi-person-circle text-light fs-2"></i>
            </a>
          </div>
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
                to="/home"
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
