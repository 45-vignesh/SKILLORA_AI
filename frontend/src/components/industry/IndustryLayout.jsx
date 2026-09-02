import { Outlet } from "react-router-dom";
import IndustryNavbar from "./IndustryNavbar";
import IndustrySidebar from "./IndustrySidebar";

export default function IndustryLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <IndustryNavbar />
      <div className="flex">
        <IndustrySidebar />
        <main className="min-w-0 flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
