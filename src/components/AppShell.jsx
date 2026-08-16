import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="flex min-h-screen">

        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">

          <Navbar />

          <main className="min-w-0 flex-1 bg-background">
            <Outlet />
          </main>

        </div>

      </div>
    </div>
  );
}