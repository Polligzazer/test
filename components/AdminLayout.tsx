import { Outlet } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";

const Layout = () => {
  return (
    <div>
      <AdminTopbar />
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
