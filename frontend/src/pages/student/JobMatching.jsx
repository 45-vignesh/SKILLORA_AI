import React, { useState } from 'react';
import { Briefcase, Building2, MapPin, DollarSign, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import WorkflowBanner from '../../components/WorkflowBanner';

const JOBS = [
  {
    id: 1,
    title: 'Junior Full Stack Developer',
    company: 'TechNova Systems',
    location: 'Bengaluru / Hybrid',
    salary: '₹ 8.0 – 11.5 LPA',
    type: 'Full-time',
    match: 92,
    skills: ['React', 'FastAPI', 'PostgreSQL', 'Docker'],
    deadline: 'In 5 days'
  },
  {
    id: 2,
    title: 'Cloud Backend Engineer Intern',
    company: 'Infosys Springboard',
    location: 'Remote',
    salary: '₹ 25,000 / month',
    type: 'Internship',
    match: 88,
    skills: ['Python', 'SQL', 'FastAPI', 'Git'],
    deadline: 'In 8 days'
  },
  {
    id: 3,
    title: 'Software Development Engineer - I',
    company: 'Zoho Corporation',
    location: 'Chennai / On-site',
    salary: '₹ 9.0 – 13.0 LPA',
    type: 'Full-time',
    match: 84,
    skills: ['Java / Python', 'React', 'REST APIs', 'Algorithms'],
    deadline: 'In 12 days'
  },
  {
    id: 4,
    title: 'AI Solutions Associate',
    company: 'Tata Elxsi',
    location: 'Bengaluru',
    salary: '₹ 8.5 – 12.0 LPA',
    type: 'Full-time',
    match: 76,
    skills: ['Python', 'Deep Learning', 'Computer Vision'],
    deadline: 'In 15 days'
  }
];

export default function JobMatching() {
  const [filter, setFilter] = useState('All');
  const [applied, setApplied] = useState([]);

  const handleApply = (id) => {
    setApplied([...applied, id]);
  };

  const filtered = filter === 'All' ? JOBS : JOBS.filter(j => j.type === filter);

  return (
    <div className="space-y-6">
      <WorkflowBanner currentStep={6} completedSteps={[0, 1, 2, 3, 4, 5]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
            Semantic Job & Internship Matching
          </h1>
          <p className="text-xs" style={{ color: '#8A8FAD' }}>
            Listings ranked by vector similarity against your verified student skills
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {['All', 'Full-time', 'Internship'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all"
              style={{
                background: filter === t ? 'rgba(79, 70, 229, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                borderColor: filter === t ? '#4F46E5' : 'rgba(255, 255, 255, 0.08)',
                color: filter === t ? '#ffffff' : '#8A8FAD'
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(j => {
          const isApplied = applied.includes(j.id);
          return (
            <div key={j.id} className="rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition-all duration-200 hover:border-white/20"
                 style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug">{j.title}</h3>
                    <div className="text-xs font-medium text-indigo-400 mt-0.5">{j.company}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-lg font-black text-emerald-400" style={{ fontFamily: 'Fraunces, serif' }}>{j.match}%</span>
                    <div className="text-[10px]" style={{ color: '#8A8FAD' }}>Match</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-y-1 gap-x-3 text-xs mb-3" style={{ color: '#8A8FAD' }}>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {j.location}</span>
                  <span className="flex items-center gap-1"><DollarSign size={12} /> {j.salary}</span>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-[11px] font-medium border border-white/10">{j.type}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {j.skills.map(s => (
                    <span key={s} className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium border"
                          style={{ background: 'rgba(79, 70, 229, 0.1)', borderColor: 'rgba(79, 70, 229, 0.25)', color: '#A5B4FC' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="text-[11px]" style={{ color: '#8A8FAD' }}>Deadline: {j.deadline}</span>
                <button
                  disabled={isApplied}
                  onClick={() => handleApply(j.id)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50 flex items-center gap-1.5"
                  style={{ background: isApplied ? '#10B981' : '#4F46E5' }}>
                  {isApplied ? <><CheckCircle2 size={13} /> Applied</> : <>Apply Now <ArrowRight size={12} /></>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
