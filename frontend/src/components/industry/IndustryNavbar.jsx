import { Bell, Building2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IndustryNavbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-indigo-600 p-2 text-white">
          <Building2 size={20} />
        </div>
        <div>
          <h1 className="font-bold">Industry Portal</h1>
          <p className="text-xs text-slate-500">Talent & Opportunity Management</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-xl p-2 hover:bg-slate-100" aria-label="Notifications">
          <Bell size={20} />
        </button>
        <button
          onClick={() => navigate("/industry/login")}
          className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
