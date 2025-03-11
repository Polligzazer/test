import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

const Layout = () => {
  return (
    <div>
      <Topbar />
      <div className="container-fluid mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
