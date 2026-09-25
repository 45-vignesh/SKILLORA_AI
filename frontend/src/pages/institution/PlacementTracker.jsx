import React from 'react';
import { Award, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';

const RECRUITERS = [
  { name: 'Tata Elxsi', offers: 38, avgCTC: '8.5 LPA', role: 'Embedded & AI Engineer' },
  { name: 'Infosys Springboard', offers: 54, avgCTC: '6.5 LPA', role: 'Systems Engineer' },
  { name: 'Zoho Corporation', offers: 29, avgCTC: '9.0 LPA', role: 'Software Engineer' },
  { name: 'Wipro Digital', offers: 41, avgCTC: '6.2 LPA', role: 'Cloud Associate' }
];

export default function PlacementTracker() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          Campus Placement Analytics & Recruiter Drives
        </h1>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          Detailed breakdown of campus drives, corporate selections, and CTC brackets
        </p>
      </div>

      <div className="rounded-2xl p-6 border space-y-4"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="font-semibold text-white text-sm">Top Campus Recruiting Partners</div>

        <div className="space-y-3">
          {RECRUITERS.map((r, idx) => (
            <div key={idx} className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                 style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div>
                <div className="font-bold text-white text-sm">{r.name}</div>
                <div className="text-xs mt-0.5" style={{ color: '#8A8FAD' }}>Primary Role: {r.role}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-amber-400">{r.offers} Offers</div>
                  <div className="text-[11px]" style={{ color: '#8A8FAD' }}>Avg: {r.avgCTC}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
