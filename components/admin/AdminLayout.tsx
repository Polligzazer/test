import { Outlet } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";

const Layout = () => {
  return (
    <div>
      <AdminTopbar />
      <div className="container-fluid mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
