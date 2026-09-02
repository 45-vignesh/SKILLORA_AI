import { useState } from "react";

export default function Interview() {
  const [interviews, setInterviews] = useState([
    { id: 1, name: "Ananya Raj", role: "Frontend Developer", date: "2026-09-05", time: "10:30", mode: "Google Meet" },
    { id: 2, name: "Karthik S", role: "Data Analyst Intern", date: "2026-09-06", time: "14:00", mode: "Microsoft Teams" },
  ]);

  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setInterviews([...interviews, {
      id: Date.now(),
      name: fd.get("name"),
      role: fd.get("role"),
      date: fd.get("date"),
      time: fd.get("time"),
      mode: fd.get("mode")
    }]);
    e.currentTarget.reset();
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold">Interview Scheduling</h2>
      <p className="mb-6 text-slate-500">Schedule and track student interviews.</p>

      <div className="grid gap-6 xl:grid-cols-[400px_1fr]">
        <div className="card">
          <h3 className="mb-4 text-lg font-bold">Schedule Interview</h3>
          <form onSubmit={submit} className="space-y-4">
            <input name="name" className="input" placeholder="Candidate name" required />
            <input name="role" className="input" placeholder="Role" required />
            <input name="date" type="date" className="input" required />
            <input name="time" type="time" className="input" required />
            <select name="mode" className="input">
              <option>Google Meet</option>
              <option>Microsoft Teams</option>
              <option>In-person</option>
            </select>
            <button className="btn-primary w-full">Schedule</button>
          </form>
        </div>

        <div className="space-y-4">
          {interviews.map((item) => (
            <div key={item.id} className="card">
              <div className="flex flex-col justify-between gap-3 sm:flex-row">
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
                <span className="h-fit rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">{item.mode}</span>
              </div>
              <p className="mt-4 text-sm font-medium">{item.date} • {item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
