import React from 'react';
import { FlaskConical, DollarSign, Award, FileText, ArrowRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Edge AI Obstacle Perception for Autonomous EV Systems',
    sponsor: 'Tata Elxsi Innovation Labs',
    grant: '₹ 15,00,000',
    duration: '12 Months',
    status: 'Active Milestone 2',
    publications: 2
  },
  {
    id: 2,
    title: 'Privacy-Preserving Federated Learning for Medical Diagnostics',
    sponsor: 'Intel Research & Higher Education',
    grant: '₹ 13,50,000',
    duration: '18 Months',
    status: 'Active Milestone 3',
    publications: 3
  }
];

export default function Research() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          Industry-Sponsored R&D Grants & Research
        </h1>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          Lead high-impact applied research co-funded by corporate innovation centres
        </p>
      </div>

      <div className="space-y-4">
        {PROJECTS.map(proj => (
          <div key={proj.id} className="rounded-2xl p-6 border space-y-4"
               style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3"
                 style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div>
                <h3 className="text-base font-bold text-white">{proj.title}</h3>
                <div className="text-xs text-emerald-400 font-medium mt-0.5">Sponsor: {proj.sponsor}</div>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-white" style={{ fontFamily: 'Fraunces, serif' }}>{proj.grant}</span>
                <div className="text-[10px]" style={{ color: '#8A8FAD' }}>Grant Value</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs" style={{ color: '#8A8FAD' }}>
              <div>Duration: <span className="text-white font-medium">{proj.duration}</span></div>
              <div>Status: <span className="text-emerald-400 font-medium">{proj.status}</span></div>
              <div>Scopus Publications: <span className="text-white font-medium">{proj.publications} Indexed</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
