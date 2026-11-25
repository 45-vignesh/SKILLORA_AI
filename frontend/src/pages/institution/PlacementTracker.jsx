import React, { useState, useEffect } from 'react';
import { Award, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';
import { institutionService } from '../../services/institutionService';

export default function PlacementTracker() {
  const [placement, setPlacement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    institutionService.getPlacementAnalytics()
      .then(res => setPlacement(res.data))
      .catch(err => {
        setError(err.isForbidden ? 'Access denied: Institution role required.' : (err.response?.data?.detail || 'Failed to load placement analytics.'));
      })
      .finally(() => setLoading(false));
  }, []);

  const recruiters = Array.isArray(placement?.top_recruiters) ? placement.top_recruiters : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          Campus Placement Analytics & Recruiter Drives
        </h1>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          Detailed breakdown of campus drives, corporate selections, and CTC brackets ({placement?.academic_year || '2025-2026'})
        </p>
      </div>

      {error && (
        <div className="rounded-xl p-3 border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300">
          {error}
        </div>
      )}

      <div className="rounded-2xl p-6 border space-y-4"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="flex items-center justify-between">
          <div className="font-semibold text-white text-sm">Top Campus Recruiting Partners</div>
          {placement && (
            <div className="text-xs text-emerald-400 font-semibold">
              {placement.placed_count} / {placement.total_eligible} Placed • Avg: {placement.avg_package}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-xs text-slate-400 py-4">Loading placement records...</div>
        ) : recruiters.length === 0 ? (
          <div className="text-xs text-slate-400 py-4">No campus recruiting partner records available for this institution.</div>
        ) : (
          <div className="space-y-3">
            {recruiters.map((r, idx) => {
              const name = typeof r === 'string' ? r : (r.company || r.name || 'Partner');
              const offers = typeof r === 'string' ? '-' : (r.hires ?? r.offers ?? 0);
              const avgCTC = typeof r === 'string' ? (placement?.avg_package || '-') : (r.avgCTC || placement?.avg_package || '-');
              const role = typeof r === 'string' ? 'Campus Recruitment' : (r.role || 'Engineering Roles');
              return (
                <div key={idx} className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                     style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div>
                    <div className="font-bold text-white text-sm">{name}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#8A8FAD' }}>Primary Role: {role}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-amber-400">{offers} Offers</div>
                      <div className="text-[11px]" style={{ color: '#8A8FAD' }}>Avg: {avgCTC}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
