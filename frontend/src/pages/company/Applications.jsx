import React, { useState, useEffect } from 'react';
import { industryService } from '../../services/industryService';

export default function CompanyApplications() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadApplications = () => {
    setLoading(true);
    industryService.getApplications()
      .then(res => {
        const rows = Array.isArray(res.data) ? res.data : [];
        setApplicants(rows.map(a => ({
          id: a.id,
          type: a.type,
          name: a.student_name,
          role: a.position,
          match: a.match_score ?? 0,
          college: a.institution,
          date: a.applied_at ? new Date(a.applied_at).toLocaleDateString() : '-',
          status: a.status,
        })));
      })
      .catch(err => {
        setError(err.isForbidden ? 'Access denied: Industry role required.' : (err.response?.data?.detail || 'Failed to load student applications.'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleShortlist = async (app) => {
    try {
      await industryService.updateApplicationStatus(app.id, 'Shortlisted', 'Shortlisted via Company Portal', app.type);
      loadApplications();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update application status.');
    }
  };

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

      {error && (
        <div className="rounded-xl p-3 border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300">
          {error}
        </div>
      )}

      <div className="rounded-2xl p-6 border space-y-4"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="font-semibold text-white text-sm">Recent Student Applications</div>

        {loading ? (
          <div className="text-xs text-slate-400 py-4">Loading applications...</div>
        ) : applicants.length === 0 ? (
          <div className="text-xs text-slate-400 py-4">No student applications received yet.</div>
        ) : (
          <div className="space-y-3">
            {applicants.map(a => (
              <div key={`${a.type}-${a.id}`} className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
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
                  {a.status !== 'Shortlisted' && (
                    <button
                      onClick={() => handleShortlist(a)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-sky-500 shadow hover:bg-sky-400 transition-colors">
                      Shortlist Candidate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
