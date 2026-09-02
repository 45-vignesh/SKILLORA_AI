import { useState } from "react";

export default function Assessment() {
  const [tests, setTests] = useState([
    { id: 1, title: "Frontend Developer Test", questions: 25, duration: 45, status: "Active" },
    { id: 2, title: "Data Analyst Aptitude", questions: 30, duration: 60, status: "Draft" },
  ]);

  const create = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setTests([...tests, {
      id: Date.now(),
      title: fd.get("title"),
      questions: fd.get("questions"),
      duration: fd.get("duration"),
      status: "Draft"
    }]);
    e.currentTarget.reset();
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold">Assessment</h2>
      <p className="mb-6 text-slate-500">Create screening tests for applicants.</p>

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <div className="card">
          <h3 className="mb-4 text-lg font-bold">Create Assessment</h3>
          <form onSubmit={create} className="space-y-4">
            <div>
              <label className="label">Assessment Title</label>
              <input name="title" className="input" required />
            </div>
            <div>
              <label className="label">No. of Questions</label>
              <input name="questions" type="number" min="1" className="input" required />
            </div>
            <div>
              <label className="label">Duration (minutes)</label>
              <input name="duration" type="number" min="1" className="input" required />
            </div>
            <button className="btn-primary w-full">Create</button>
          </form>
        </div>

        <div className="space-y-4">
          {tests.map((test) => (
            <div key={test.id} className="card flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-bold">{test.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{test.questions} questions • {test.duration} minutes</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{test.status}</span>
                <button className="btn-secondary py-2">Manage</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
