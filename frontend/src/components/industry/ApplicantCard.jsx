export default function ApplicantCard({ applicant, onShortlist, onReject }) {
  return (
    <div className="card">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
          {applicant.name?.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold">{applicant.name}</h3>
          <p className="text-sm text-slate-500">{applicant.degree} • {applicant.college}</p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          {applicant.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">CGPA</p>
          <p className="font-bold">{applicant.cgpa}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Match</p>
          <p className="font-bold text-emerald-600">{applicant.match}%</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        <span className="font-semibold">Skills:</span> {applicant.skills.join(", ")}
      </p>

      <div className="mt-5 flex gap-2">
        <button onClick={onShortlist} className="btn-primary flex-1 py-2">Shortlist</button>
        <button onClick={onReject} className="btn-secondary flex-1 py-2">Reject</button>
      </div>
    </div>
  );
}
