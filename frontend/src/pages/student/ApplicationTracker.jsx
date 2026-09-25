import React from 'react';
import { ClipboardList, Building2, Calendar, CheckCircle2, Clock, XCircle, ArrowRight } from 'lucide-react';
import WorkflowBanner from '../../components/WorkflowBanner';

const APPLICATIONS = [
  {
    id: 1,
    role: 'Junior Full Stack Developer',
    company: 'TechNova Systems',
    status: 'Shortlisted',
    statusColor: 'emerald',
    appliedDate: '18 Sep 2026',
    stage: 'Technical Interview Scheduled',
    nextAction: 'Prep for Live Coding on 28 Sep'
  },
  {
    id: 2,
    role: 'Cloud Backend Engineer Intern',
    company: 'Infosys Springboard',
    status: 'Interview',
    statusColor: 'sky',
    appliedDate: '12 Sep 2026',
    stage: 'Round 2: System Design',
    nextAction: 'Review Database Sharding Concepts'
  },
  {
    id: 3,
    role: 'Software Development Engineer - I',
    company: 'Zoho Corporation',
    status: 'Applied',
    statusColor: 'indigo',
    appliedDate: '21 Sep 2026',
    stage: 'Resume Screened',
    nextAction: 'Awaiting Assessment Link'
  },
  {
    id: 4,
    role: 'AI Solutions Associate',
    company: 'Tata Elxsi',
    status: 'Rejected',
    statusColor: 'rose',
    appliedDate: '05 Sep 2026',
    stage: 'Profile Evaluated',
    nextAction: 'Review Model Deployment Requirements'
  }
];

export default function ApplicationTracker() {
  return (
    <div className="space-y-6">
      <WorkflowBanner currentStep={7} completedSteps={[0, 1, 2, 3, 4, 5, 6]} />

      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          Job & Internship Application Pipeline
        </h1>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          Real-time status tracking, recruiter communications, and interview schedules
        </p>
      </div>

      {/* Stage Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Applied', count: 1, color: '#4F46E5' },
          { label: 'Shortlisted', count: 1, color: '#10B981' },
          { label: 'Interviewing', count: 1, color: '#0EA5E9' },
          { label: 'Archived', count: 1, color: '#8A8FAD' }
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl border text-center"
               style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Fraunces, serif' }}>{s.count}</div>
            <div className="text-xs font-medium mt-1" style={{ color: s.color }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {APPLICATIONS.map(a => {
          const colorClass = a.statusColor === 'emerald' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            : a.statusColor === 'sky' ? 'bg-sky-500/15 text-sky-400 border-sky-500/30'
            : a.statusColor === 'indigo' ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
            : 'bg-rose-500/15 text-rose-400 border-rose-500/30';

          return (
            <div key={a.id} className="p-5 rounded-2xl border transition-all duration-200 hover:border-white/20"
                 style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{a.role}</h3>
                  <div className="text-xs text-indigo-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <Building2 size={13} /> {a.company}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colorClass}`}>
                    {a.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl border text-xs"
                   style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div>
                  <span style={{ color: '#8A8FAD' }}>Applied On:</span>
                  <div className="font-medium text-white mt-0.5 flex items-center gap-1">
                    <Calendar size={12} /> {a.appliedDate}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#8A8FAD' }}>Current Hiring Stage:</span>
                  <div className="font-medium text-white mt-0.5">{a.stage}</div>
                </div>
                <div>
                  <span style={{ color: '#8A8FAD' }}>Next Recommended Step:</span>
                  <div className="font-medium text-amber-400 mt-0.5">{a.nextAction}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
