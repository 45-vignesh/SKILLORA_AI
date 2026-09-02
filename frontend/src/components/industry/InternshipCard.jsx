import { Calendar, MapPin, Users } from "lucide-react";

export default function InternshipCard({ internship, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{internship.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{internship.stipend}</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {internship.status}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2"><MapPin size={16} />{internship.location}</p>
        <p className="flex items-center gap-2"><Calendar size={16} />{internship.duration}</p>
        <p className="flex items-center gap-2"><Users size={16} />{internship.applicants} applicants</p>
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
