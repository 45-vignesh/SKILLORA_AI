import React, { useState } from 'react';
import { Users, Search, Download, CheckCircle2, AlertCircle } from 'lucide-react';

const STUDENTS = [
  { id: 1, name: 'Aarav Sharma', dept: 'CSE', year: 3, cgpa: '8.8', readiness: 94, skills: ['FastAPI', 'React', 'Docker'], status: 'Placement Ready' },
  { id: 2, name: 'Neha Gupta', dept: 'AI & DS', year: 4, cgpa: '9.2', readiness: 91, skills: ['PyTorch', 'Vector DBs', 'Python'], status: 'Placed (Zoho)' },
  { id: 3, name: 'Vikram Mehta', dept: 'IT', year: 3, cgpa: '8.2', readiness: 84, skills: ['React', 'Node.js', 'PostgreSQL'], status: 'Interviewing' },
  { id: 4, name: 'Kavita Patel', dept: 'ECE', year: 4, cgpa: '7.9', readiness: 68, skills: ['C++', 'Embedded C', 'RTOS'], status: 'Upskilling Required' },
  { id: 5, name: 'Aditya Sen', dept: 'CSE', year: 4, cgpa: '8.5', readiness: 87, skills: ['Python', 'Docker', 'AWS'], status: 'Placed (Infosys)' }
];

export default function StudentAnalytics() {
  const [query, setQuery] = useState('');

  const filtered = STUDENTS.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.dept.toLowerCase().includes(query.toLowerCase())
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
              {filtered.map(s => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
