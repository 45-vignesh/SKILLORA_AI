import React, { useState } from 'react';
import { Search, UserCheck, Sparkles, Filter, CheckCircle2, ArrowRight } from 'lucide-react';

const CANDIDATES = [
  {
    id: 1,
    name: 'Aarav Sharma',
    college: 'NIT Bengaluru',
    degree: 'B.Tech CSE (Year 3)',
    cgpa: '8.8',
    readiness: 94,
    skills: ['React', 'FastAPI', 'Python', 'SQL', 'PostgreSQL', 'Docker'],
    status: 'Available for Internship'
  },
  {
    id: 2,
    name: 'Priya Iyer',
    college: 'IIIT Hyderabad',
    degree: 'B.Tech ECE (Year 4)',
    cgpa: '9.1',
    readiness: 89,
    skills: ['Python', 'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'FastAPI'],
    status: 'Placement Ready'
  },
  {
    id: 3,
    name: 'Rohan Varma',
    college: 'BITS Pilani',
    degree: 'B.Tech CS (Year 4)',
    cgpa: '8.5',
    readiness: 85,
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind', 'GraphQL'],
    status: 'Placement Ready'
  },
  {
    id: 4,
    name: 'Ananya Reddy',
    college: 'IIT Madras',
    degree: 'B.Tech AI & DS (Year 3)',
    cgpa: '9.4',
    readiness: 82,
    skills: ['PyTorch', 'Python', 'Vector DBs', 'FastAPI', 'scikit-learn'],
    status: 'Seeking Summer Internship'
  }
];

export default function CandidateSearch() {
  const [query, setQuery] = useState('');
  const [invited, setInvited] = useState([]);

  const handleInvite = (id) => {
    setInvited([...invited, id]);
  };

  const filtered = CANDIDATES.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
    c.college.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          AI Talent Search & Candidate Discovery
        </h1>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          Filter verified student talent across universities by AI readiness scores and verified tech stacks
        </p>
      </div>

      {/* Search Bar */}
      <div className="rounded-2xl p-4 border flex items-center gap-3"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <Search size={18} style={{ color: '#8A8FAD' }} />
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by student name, college, or skill (e.g. FastAPI, Docker, PyTorch)..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />
      </div>

      {/* Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => {
          const isInvited = invited.includes(c.id);
          return (
            <div key={c.id} className="rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition-all duration-200 hover:border-white/20"
                 style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-bold text-white text-base">{c.name}</h3>
                    <div className="text-xs text-sky-400 font-medium">{c.college} • CGPA {c.cgpa}</div>
                    <div className="text-[11px]" style={{ color: '#8A8FAD' }}>{c.degree}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-lg font-black text-emerald-400" style={{ fontFamily: 'Fraunces, serif' }}>{c.readiness}%</span>
                    <div className="text-[10px]" style={{ color: '#8A8FAD' }}>Readiness</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {c.skills.map(s => (
                    <span key={s} className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium border"
                          style={{ background: 'rgba(14, 165, 233, 0.1)', borderColor: 'rgba(14, 165, 233, 0.25)', color: '#7DD3FC' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="text-[11px] font-medium text-emerald-400">{c.status}</span>
                <button
                  disabled={isInvited}
                  onClick={() => handleInvite(c.id)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50 flex items-center gap-1.5"
                  style={{ background: isInvited ? '#10B981' : '#0EA5E9' }}>
                  {isInvited ? <><CheckCircle2 size={13} /> Interview Invited</> : <>Invite to Interview <ArrowRight size={12} /></>}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
