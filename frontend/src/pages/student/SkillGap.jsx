import React, { useState } from 'react';
import { Target, AlertTriangle, CheckCircle2, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import WorkflowBanner from '../../components/WorkflowBanner';

const ROLES = [
  'Full Stack Developer',
  'Cloud & DevOps Engineer',
  'AI / ML Engineer',
  'Data Engineer'
];

const RADAR_DATA = [
  { skill: 'React & Frontend', student: 85, benchmark: 90 },
  { skill: 'Python & FastAPI', student: 80, benchmark: 85 },
  { skill: 'PostgreSQL & ORM', student: 75, benchmark: 80 },
  { skill: 'Docker & Containers', student: 45, benchmark: 85 },
  { skill: 'CI/CD Pipelines', student: 40, benchmark: 80 },
  { skill: 'System Design', student: 55, benchmark: 75 },
];

const GAPS = [
  {
    skill: 'Docker & Kubernetes',
    current: 45,
    required: 85,
    gap: 40,
    priority: 'High',
    course: 'Container Orchestration & Docker Fundamentals',
    action: 'Enroll in Module 4'
  },
  {
    skill: 'CI/CD Automated Pipelines',
    current: 40,
    required: 80,
    gap: 40,
    priority: 'High',
    course: 'GitHub Actions & Cloud CI/CD Deployment',
    action: 'Start Hands-on Lab'
  },
  {
    skill: 'Distributed System Design',
    current: 55,
    required: 75,
    gap: 20,
    priority: 'Medium',
    course: 'Scalable Microservice Architecture Patterns',
    action: 'Read Case Studies'
  }
];

export default function SkillGap() {
  const [role, setRole] = useState(ROLES[0]);

  return (
    <div className="space-y-6">
      <WorkflowBanner currentStep={3} completedSteps={[0, 1, 2]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
            AI Skill Gap Diagnostics
          </h1>
          <p className="text-xs" style={{ color: '#8A8FAD' }}>
            Compare your verified capabilities against 2026 industry hiring requirements
          </p>
        </div>

        {/* Role Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#8A8FAD' }}>Benchmark Role:</span>
          <select 
            value={role} 
            onChange={e => setRole(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-white border outline-none cursor-pointer"
            style={{ background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.12)' }}>
            {ROLES.map(r => <option key={r} value={r} className="bg-[#0F1020] text-white">{r}</option>)}
          </select>
        </div>
      </div>

      {/* Summary Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Match Percentage Card */}
        <div className="rounded-2xl p-6 border flex flex-col justify-between"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#8A8FAD' }}>Target Role Alignment</div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-black text-white" style={{ fontFamily: 'Fraunces, serif' }}>72%</span>
              <span className="text-sm font-semibold text-amber-400">Moderate Gap</span>
            </div>
            <p className="text-xs mt-3 leading-relaxed" style={{ color: '#8A8FAD' }}>
              You possess 5 of 8 core technical requirements. Closing 2 critical deficits will raise readiness to 88%+.
            </p>
          </div>

          <div className="pt-4 border-t mt-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-[11px] mb-2 font-medium" style={{ color: '#8A8FAD' }}>Predicted Timeline to 90% Readiness:</div>
            <div className="px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 border"
                 style={{ background: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
              ~3.5 Weeks (10 hrs/week study)
            </div>
          </div>
        </div>

        {/* Radar Chart Card */}
        <div className="lg:col-span-2 rounded-2xl p-6 border"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="font-semibold text-white text-sm mb-2">Proficiency Radar: Current vs Benchmark</div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={RADAR_DATA}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
                <PolarAngleAxis dataKey="skill" stroke="#8A8FAD" tick={{ fill: '#8A8FAD', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255, 255, 255, 0.1)" />
                <Radar name="Your Score" dataKey="student" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.35} />
                <Radar name="Target Benchmark" dataKey="benchmark" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.15} />
                <Legend wrapperStyle={{ paddingTop: 10, fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#0F1020', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Actionable Gap Items */}
      <div className="rounded-2xl p-6 border space-y-4"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="font-semibold text-white text-sm">Prioritized Skill Deficits to Close</div>
        <div className="space-y-3">
          {GAPS.map(g => (
            <div key={g.skill} className="p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3"
                 style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{g.skill}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    g.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {g.priority} Priority Deficit
                  </span>
                </div>
                <div className="text-xs" style={{ color: '#8A8FAD' }}>
                  Recommended Action: <span className="text-indigo-400 font-medium">{g.course}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <div className="text-xs font-semibold text-white">{g.current}% / {g.required}%</div>
                  <div className="text-[10px] text-red-400 font-medium">-{g.gap}% Deficit</div>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow"
                        style={{ background: '#4F46E5' }}>
                  <BookOpen size={12} /> {g.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
