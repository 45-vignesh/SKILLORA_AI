import React from 'react';
import { GraduationCap, Calendar, MapPin, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

const PROGRAMS = [
  {
    id: 1,
    title: 'Generative AI & LLM Systems in Production',
    provider: 'Google Cloud India',
    mode: 'Hybrid / Virtual Labs',
    duration: '4 Weeks (Part-time)',
    skills: ['LLMs', 'RAG Pipelines', 'Vector DBs', 'Fine-Tuning'],
    enrolled: true
  },
  {
    id: 2,
    title: 'Enterprise Cloud Microservices with Kubernetes',
    provider: 'Infosys Springboard',
    mode: 'Virtual Classroom',
    duration: '3 Weeks',
    skills: ['FastAPI', 'Docker', 'Kubernetes', 'Istio Mesh'],
    enrolled: true
  },
  {
    id: 3,
    title: 'Automotive Embedded Systems & AUTOSAR',
    provider: 'Tata Elxsi Innovation Labs',
    mode: 'On-site Immersion (Bengaluru)',
    duration: '2 Weeks (Full-time Sabbatical)',
    skills: ['Embedded C', 'CAN Protocol', 'AUTOSAR', 'RTOS'],
    enrolled: false
  }
];

export default function FDPTraining() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          Faculty Development Programs (FDP) & Corporate Sabbaticals
        </h1>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          Upskill in enterprise engineering practices to directly modernize classroom curricula
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROGRAMS.map(p => (
          <div key={p.id} className="rounded-2xl p-5 border flex flex-col justify-between space-y-4"
               style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {p.enrolled ? 'Enrolled & Active' : 'Nominations Open'}
                </span>
              </div>

              <h3 className="font-bold text-white text-sm leading-snug">{p.title}</h3>
              <div className="text-xs text-emerald-400 font-medium mt-1">{p.provider}</div>

              <div className="text-xs space-y-1 mt-3" style={{ color: '#8A8FAD' }}>
                <div>Mode: {p.mode}</div>
                <div>Duration: {p.duration}</div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-white/80 border border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <button 
                disabled={p.enrolled}
                className="w-full py-2 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50"
                style={{ background: p.enrolled ? 'rgba(255,255,255,0.1)' : '#10B981' }}>
                {p.enrolled ? 'Nomination Confirmed' : 'Apply for Sabbatical'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
