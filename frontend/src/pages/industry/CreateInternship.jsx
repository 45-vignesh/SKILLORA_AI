import { useState } from "react";

export default function CreateInternship() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-extrabold">Create Internship</h2>
      <p className="mb-6 text-slate-500">Publish a learning-focused internship opportunity.</p>

      {success && <div className="mb-5 rounded-xl bg-emerald-50 p-4 font-medium text-emerald-700">Internship created successfully.</div>}

      <div className="card">
        <form onSubmit={(e) => { e.preventDefault(); setSuccess(true); }} className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="label">Internship Title</label>
            <input className="input" placeholder="Data Analyst Intern" required />
          </div>
          <div>
            <label className="label">Mode</label>
            <select className="input"><option>On-site</option><option>Remote</option><option>Hybrid</option></select>
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" placeholder="Chennai" />
          </div>
          <div>
            <label className="label">Duration</label>
            <input className="input" placeholder="3 months" />
          </div>
          <div>
            <label className="label">Stipend</label>
            <input className="input" placeholder="₹15,000/month" />
          </div>
          <div>
            <label className="label">Openings</label>
            <input type="number" className="input" defaultValue="10" min="1" />
          </div>
          <div className="md:col-span-2">
            <label className="label">Skills</label>
            <input className="input" placeholder="Python, SQL, Power BI, Excel" />
          </div>
          <div className="md:col-span-2">
            <label className="label">Description</label>
            <textarea className="input min-h-36" placeholder="Internship responsibilities..." />
          </div>
          <div>
            <label className="label">Minimum CGPA</label>
            <input type="number" step="0.1" className="input" placeholder="6.5" />
          </div>
          <div>
            <label className="label">Last Date</label>
            <input type="date" className="input" />
          </div>
          <button className="btn-primary md:col-span-2 md:w-fit">Publish Internship</button>
        </form>
      </div>
    </div>
  );
}
