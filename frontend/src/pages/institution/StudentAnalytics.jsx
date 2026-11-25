import React, { useState, useEffect } from 'react';
import { Users, Search, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { institutionService } from '../../services/institutionService';

export default function StudentAnalytics() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    institutionService.getStudents()
      .then(res => {
        const rows = Array.isArray(res.data) ? res.data : [];
        setStudents(rows.map(s => ({
          id: s.id,
          name: s.full_name,
          dept: s.department,
          year: s.year_of_study,
          cgpa: s.cgpa,
          readiness: s.readiness_score ?? 0,
          skills: Array.isArray(s.top_skills) ? s.top_skills : [],
          status: (s.readiness_score ?? 0) >= 80 ? 'Placement Ready' : (s.readiness_score ?? 0) >= 60 ? 'Interviewing' : 'Upskilling Required',
        })));
      })
      .catch(err => {
        setError(err.isForbidden ? 'Access denied: Institution role required.' : (err.response?.data?.detail || 'Failed to load student roster.'));
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = students.filter(s =>
    (s.name || '').toLowerCase().includes(query.toLowerCase()) ||
    (s.dept || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
            Batch Student Readiness Roster
          </h1>
          <p className="text-xs" style={{ color: '#8A8FAD' }}>
            Real-time individual career readiness diagnostics and placement statuses
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white border hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <Download size={14} /> Export CSV Roster
        </button>
      </div>

      {error && (
        <div className="rounded-xl p-3 border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="rounded-2xl p-4 border flex items-center gap-3"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <Search size={18} style={{ color: '#8A8FAD' }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Filter students by name or department..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />
      </div>

      {/* Student Table */}
      <div className="rounded-2xl border overflow-hidden"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                <th className="p-4 text-white font-semibold">Student Name</th>
                <th className="p-4 text-white font-semibold">Department & Year</th>
                <th className="p-4 text-white font-semibold">CGPA</th>
                <th className="p-4 text-white font-semibold">Readiness Score</th>
                <th className="p-4 text-white font-semibold">Top Skills</th>
                <th className="p-4 text-white font-semibold">Placement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {loading ? (
                <tr><td colSpan={6} className="p-6 text-center text-slate-400">Loading institution student roster...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-6 text-center text-slate-400">No students found for this institution.</td></tr>
              ) : (
                filtered.map(s => (
                  <tr key={s.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-white">{s.name}</td>
                    <td className="p-4" style={{ color: '#8A8FAD' }}>{s.dept} • Year {s.year}</td>
                    <td className="p-4 font-medium text-white">{s.cgpa}</td>
                    <td className="p-4">
                      <span className="font-bold text-emerald-400">{s.readiness}%</span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {s.skills.map(sk => (
                          <span key={sk} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/80 border border-white/10">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-[11px] font-semibold text-amber-400">{s.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
