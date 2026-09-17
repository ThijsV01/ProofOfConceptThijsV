import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./AppLayout.css";

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
