import { BriefcaseBusiness, GraduationCap, Users, CalendarCheck } from "lucide-react";

const stats = [
  { label: "Active Jobs", value: "12", icon: BriefcaseBusiness },
  { label: "Internships", value: "8", icon: GraduationCap },
  { label: "Applications", value: "146", icon: Users },
  { label: "Interviews", value: "18", icon: CalendarCheck },
];

export default function IndustryDashboard() {
  return (
    <div>
      <div className="mb-7">
        <h2 className="text-2xl font-extrabold md:text-3xl">Welcome, ABC Technologies</h2>
        <p className="mt-1 text-slate-500">Manage hiring, internships and campus engagement.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-extrabold">{value}</p>
              </div>
              <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600"><Icon /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-bold">Recent Applications</h3>
          <div className="mt-4 space-y-4">
            {[
              ["Ananya R", "Frontend Developer", "92% match"],
              ["Karthik S", "Data Analyst Intern", "88% match"],
              ["Divya P", "Java Developer", "86% match"],
            ].map(([name, role, match]) => (
              <div key={name} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-slate-500">{role}</p>
                </div>
                <span className="text-sm font-bold text-emerald-600">{match}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold">Upcoming Schedule</h3>
          <div className="mt-4 space-y-4">
            {[
              ["Technical Interview", "Sep 05 • 10:30 AM"],
              ["Campus Hiring Drive", "Sep 08 • 09:00 AM"],
              ["Faculty AI Training", "Sep 12 • 02:00 PM"],
            ].map(([title, time]) => (
              <div key={title} className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-slate-500">{time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
