import {
  LayoutDashboard, Building, BriefcaseBusiness, GraduationCap, Users,
  Search, ClipboardCheck, CalendarDays, Presentation, PlusCircle
} from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/industry/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/industry/profile", label: "Profile", icon: Building },

  { to: "/industry/create-job", label: "Create Job", icon: PlusCircle },
  { to: "/industry/jobs", label: "Manage Jobs", icon: BriefcaseBusiness },

  { to: "/industry/create-internship", label: "Create Internship", icon: PlusCircle },
  { to: "/industry/internships", label: "Manage Internships", icon: GraduationCap },

  { to: "/industry/applications", label: "Applications", icon: Users },
  { to: "/industry/students", label: "Student Search", icon: Search },
  { to: "/industry/assessment", label: "Assessment", icon: ClipboardCheck },
  { to: "/industry/interview", label: "Interview", icon: CalendarDays },
  { to: "/industry/faculty-training", label: "Faculty Training", icon: Presentation },
];

export default function IndustrySidebar() {
  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-64 shrink-0 border-r bg-white p-4 lg:block">
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
