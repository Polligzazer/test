import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

const Layout = () => {
  return (
    <div>
      <Topbar />
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
