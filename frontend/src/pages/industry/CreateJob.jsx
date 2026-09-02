import { useState } from "react";

export default function CreateJob() {
  const [success, setSuccess] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-extrabold">Create Job</h2>
      <p className="mb-6 text-slate-500">Publish a new full-time opportunity for eligible students.</p>

      {success && (
        <div className="mb-5 rounded-xl bg-emerald-50 p-4 font-medium text-emerald-700">
          Job created successfully.
        </div>
      )}

      <div className="card">
        <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="label">Job Title</label>
            <input className="input" placeholder="Frontend Developer" required />
          </div>
          <div>
            <label className="label">Job Type</label>
            <select className="input">
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
            </select>
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" placeholder="Chennai / Hybrid" required />
          </div>
          <div>
            <label className="label">Salary / CTC</label>
            <input className="input" placeholder="₹6 - ₹8 LPA" />
          </div>
          <div>
            <label className="label">Experience</label>
            <input className="input" placeholder="0-2 years" />
          </div>
          <div>
            <label className="label">Vacancies</label>
            <input type="number" min="1" className="input" defaultValue="5" />
          </div>
          <div className="md:col-span-2">
            <label className="label">Required Skills</label>
            <input className="input" placeholder="React, JavaScript, Tailwind CSS, REST API" />
          </div>
          <div className="md:col-span-2">
            <label className="label">Job Description</label>
            <textarea className="input min-h-36" placeholder="Role responsibilities and requirements..." required />
          </div>
          <div>
            <label className="label">Minimum CGPA</label>
            <input type="number" step="0.1" className="input" placeholder="7.0" />
          </div>
          <div>
            <label className="label">Application Deadline</label>
            <input type="date" className="input" />
          </div>
          <button className="btn-primary md:col-span-2 md:w-fit">Publish Job</button>
        </form>
      </div>
    </div>
  );
}
