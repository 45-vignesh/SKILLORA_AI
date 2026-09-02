import { Mail, MapPin } from "lucide-react";

export default function StudentMatchCard({ student }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold">{student.name}</h3>
          <p className="text-sm text-slate-500">{student.degree} • {student.year}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          {student.match}% Match
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2"><MapPin size={15} />{student.location}</p>
        <p className="flex items-center gap-2"><Mail size={15} />{student.email}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {student.skills.map((skill) => (
          <span key={skill} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            {skill}
          </span>
        ))}
      </div>

      <button className="btn-primary mt-5 w-full py-2">View Profile</button>
    </div>
  );
}
