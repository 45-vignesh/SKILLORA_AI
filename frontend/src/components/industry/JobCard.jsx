import { MapPin, Users, BriefcaseBusiness } from "lucide-react";

export default function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{job.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{job.type}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {job.status}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2"><MapPin size={16} />{job.location}</p>
        <p className="flex items-center gap-2"><Users size={16} />{job.applicants} applicants</p>
        <p className="flex items-center gap-2"><BriefcaseBusiness size={16} />{job.experience}</p>
      </div>

      <div className="mt-5 flex gap-2">
        <button onClick={onEdit} className="btn-secondary flex-1 py-2">Edit</button>
        <button onClick={onDelete} className="flex-1 rounded-xl bg-rose-50 py-2 font-semibold text-rose-600 hover:bg-rose-100">
          Delete
        </button>
      </div>
    </div>
  );
}
