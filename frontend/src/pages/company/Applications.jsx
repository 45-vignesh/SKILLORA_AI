import React from 'react';
import { Users, CheckCircle2, Clock, XCircle, ArrowRight } from 'lucide-react';

const APPLICANTS = [
  { id: 1, name: 'Aarav Sharma', role: 'Junior Full Stack Developer', match: 92, college: 'NIT Bengaluru', date: '22 Sep 2026', status: 'Under Review' },
  { id: 2, name: 'Deepak Rao', role: 'Junior Full Stack Developer', match: 86, college: 'VIT Vellore', date: '21 Sep 2026', status: 'Shortlisted' },
  { id: 3, name: 'Meera Nair', role: 'Cloud Backend Engineer Intern', match: 89, college: 'IIIT Hyderabad', date: '20 Sep 2026', status: 'Interview' },
  { id: 4, name: 'Siddharth Jain', role: 'DevOps & Infrastructure Associate', match: 74, college: 'SRM University', date: '19 Sep 2026', status: 'Pending' }
];

export default function CompanyApplications() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          Applicant Management & Review Pipeline
        </h1>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          Evaluate incoming student submissions ranked by AI competency scores
        </p>
      </div>

      <div className="rounded-2xl p-6 border space-y-4"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="font-semibold text-white text-sm">Recent Student Applications</div>

        <div className="space-y-3">
          {APPLICANTS.map(a => (
            <div key={a.id} className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                 style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{a.name}</span>
                  <span className="text-xs text-sky-400 font-medium">({a.college})</span>
                  <span className="text-xs font-black text-emerald-400 ml-1">{a.match}% Match</span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#8A8FAD' }}>
                  Applied for: <span className="text-white font-medium">{a.role}</span> • Submitted on {a.date}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-white/10 text-white border border-white/10">
                  {a.status}
                </span>
                <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-sky-500 shadow hover:bg-sky-400 transition-colors">
                  Review Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
