import { useState } from "react";

export default function FacultyTraining() {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: "Generative AI for Educators",
      date: "2026-09-12",
      mode: "Online",
      seats: 50,
    },
    {
      id: 2,
      title: "Industry 4.0 Faculty Development",
      date: "2026-09-20",
      mode: "On-site",
      seats: 30,
    },
  ]);

  const addProgram = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const newProgram = {
      id: Date.now(),
      title: form.get("title"),
      date: form.get("date"),
      mode: form.get("mode"),
      seats: form.get("seats"),
    };

    setPrograms((prev) => [...prev, newProgram]);
    e.target.reset();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-slate-800">
        Faculty Training
      </h2>

      <p className="text-slate-500 mt-2 mb-6">
        Organize industry-led faculty development programs.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Create Training Program
          </h3>

          <form onSubmit={addProgram} className="space-y-4">

            <input
              name="title"
              placeholder="Training Title"
              required
              className="w-full border rounded-lg p-3"
            />

            <input
              name="date"
              type="date"
              required
              className="w-full border rounded-lg p-3"
            />

            <select
              name="mode"
              className="w-full border rounded-lg p-3"
            >
              <option>Online</option>
              <option>On-site</option>
              <option>Hybrid</option>
            </select>

            <input
              name="seats"
              type="number"
              placeholder="Seats"
              required
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-lg py-3 hover:bg-indigo-700"
            >
              Create Program
            </button>

          </form>
        </div>

        <div className="space-y-4">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white shadow rounded-xl p-5"
            >
              <h3 className="text-lg font-bold">
                {program.title}
              </h3>

              <p className="mt-2">
                <strong>Date:</strong> {program.date}
              </p>

              <p>
                <strong>Mode:</strong> {program.mode}
              </p>

              <p>
                <strong>Seats:</strong> {program.seats}
              </p>

              <button className="mt-4 w-full border border-indigo-600 text-indigo-600 rounded-lg py-2 hover:bg-indigo-600 hover:text-white">
                View Registrations
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}