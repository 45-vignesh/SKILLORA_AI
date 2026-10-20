import React, { useState, useEffect } from 'react';
import { FileText, TrendingUp, Briefcase, Award, Target, Zap, ArrowRight, CheckCircle, Sparkles, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import WorkflowBanner from '../../components/WorkflowBanner';
import RoleLogo from '../../components/RoleLogo';
import API from '../../services/api';

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const accent = '#4F46E5';

  useEffect(() => {
    API.get('/students/dashboard')
      .then(r => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const quickActions = [
    { label: 'Upload Resume', desc: 'AI ATS & Skill Extraction', icon: FileText, path: '/student/resume', color: '#6366F1' },
    { label: 'Skill Assessment', desc: 'Adaptive Benchmark Quiz', icon: CheckCircle, path: '/student/assessment', color: '#0EA5E9' },
    { label: 'Skill Gap Analysis', desc: 'Target vs Reality Matrix', icon: TrendingUp, path: '/student/skill-gap', color: '#10B981' },
    { label: 'AI Job Matching', desc: 'Semantic Vector Match', icon: Briefcase, path: '/student/jobs', color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6 relative">
      {/* Ambient Top Aurora (Indigo + Pure White Merge) */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-44 pointer-events-none opacity-40 blur-3xl"
           style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.35) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 70%)' }} />

      <WorkflowBanner currentStep={2} completedSteps={[0, 1]} />

      {/* Hero Welcome Banner (Indigo + White Merge) */}
      <div className="rounded-2xl p-6 relative overflow-hidden border shadow-xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(79, 70, 229, 0.38) 45%, rgba(124, 58, 237, 0.22) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.22)',
          boxShadow: '0 8px 32px rgba(79, 70, 229, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)'
        }}>
        {/* Luminous Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
             style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, #818CF8 50%, transparent 100%)' }} />
        
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5 z-10">
          <div className="flex items-start gap-4">
            <RoleLogo role="STUDENT" size={58} className="ring-4 ring-white/20 shadow-2xl mt-1" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 border backdrop-blur-md"
                   style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.25)', color: '#FFFFFF' }}>
                <Sparkles size={12} className="text-yellow-300" /> Target Role: Full Stack Developer
              </div>
              <h1 className="text-2xl md:text-3xl font-black mb-1.5 tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                <span style={{ 
                  background: 'linear-gradient(135deg, #FFFFFF 40%, #E0E7FF 75%, #A5B4FC 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>
                  Accelerate Your Placement Readiness
                </span>
              </h1>
              <p className="text-sm max-w-xl text-slate-200 leading-relaxed">
                Your profile is matched with 24 live industry listings. Complete containerization modules to boost readiness to 90%+.
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/student/skill-gap')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 flex-shrink-0 cursor-pointer border"
            style={{ 
              background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', 
              borderColor: 'rgba(255, 255, 255, 0.35)',
              boxShadow: '0 4px 18px rgba(99, 102, 241, 0.5)' 
            }}>
            View Skill Gap <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* 4 KPI Stat Cards with White + Indigo Merge */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Readiness Score" value={data?.readiness_score ? `${data.readiness_score}%` : '74%'} sub="Placement benchmark" icon={Target} accent="#6366F1" trend="+12% this month" />
        <StatCard label="Verified Skills" value={data?.skills_count || 14} sub="Resume & quiz validated" icon={Zap} accent="#10B981" />
        <StatCard label="AI Job Matches" value={data?.job_matches || 9} sub="High alignment jobs" icon={Briefcase} accent="#0EA5E9" />
        <StatCard label="Active Applications" value={data?.applications || 4} sub="In hiring pipeline" icon={Award} accent="#F59E0B" />
      </div>

      {/* Quick Actions (White + Accent Glass Cards) */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-300">Core Actions</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {quickActions.map(a => {
            const Icon = a.icon;
            return (
              <button 
                key={a.label} 
                onClick={() => navigate(a.path)}
                className="rounded-2xl p-4 text-left border transition-all duration-300 hover:border-white/40 hover:-translate-y-1 group cursor-pointer relative overflow-hidden shadow-md"
                style={{ 
                  background: `linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 60%, ${a.color}15 100%)`, 
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)'
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-md border"
                  style={{ background: `linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, ${a.color}40 100%)`, borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                  <Icon size={19} color="white" />
                </div>
                <div className="font-bold text-sm text-white group-hover:text-indigo-200 transition-colors">{a.label}</div>
                <div className="text-xs mt-0.5 text-slate-400">{a.desc}</div>
                <div className="flex items-center gap-1 mt-3 text-xs font-semibold" style={{ color: a.color }}>
                  Launch <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Careers & Readiness Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Career Paths */}
        <div className="rounded-2xl p-5 border shadow-lg" 
             style={{ 
               background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(99, 102, 241, 0.1) 100%)', 
               borderColor: 'rgba(255, 255, 255, 0.12)',
               boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)'
             }}>
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-white text-sm">Target Role Alignments</div>
            <button onClick={() => navigate('/student/career')} className="text-xs font-semibold flex items-center gap-1 cursor-pointer text-indigo-300 hover:text-white transition-colors">
              Explore All <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3.5">
            {[
              { role: 'Full Stack Web Developer', match: 86, color: '#6366F1', desc: 'React, Node, Python, SQL' },
              { role: 'Backend Microservices Engineer', match: 78, color: '#0EA5E9', desc: 'FastAPI, Docker, PostgreSQL' },
              { role: 'AI / ML Engineer', match: 64, color: '#10B981', desc: 'PyTorch, scikit-learn, Vector DBs' }
            ].map(r => (
              <div key={r.role} className="p-3.5 rounded-xl border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold text-white">{r.role}</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border shadow-sm" 
                        style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.25)', color: '#FFFFFF' }}>{r.match}% Match</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-1.5 overflow-hidden p-0.5 border border-white/10">
                  <div className="h-full rounded-full transition-all duration-500 shadow-sm" 
                       style={{ width: `${r.match}%`, background: `linear-gradient(90deg, #FFFFFF 0%, ${r.color} 100%)` }} />
                </div>
                <div className="text-[11px] text-slate-400">Key Skills: {r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Actions */}
        <div className="rounded-2xl p-5 border shadow-lg" 
             style={{ 
               background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(99, 102, 241, 0.1) 100%)', 
               borderColor: 'rgba(255, 255, 255, 0.12)',
               boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)'
             }}>
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-white text-sm">Top Priority Learning Tasks</div>
            <button onClick={() => navigate('/student/learning-path')} className="text-xs font-semibold flex items-center gap-1 cursor-pointer text-indigo-300 hover:text-white transition-colors">
              Full Roadmap <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { task: 'Docker & Multi-Container Deployment', category: 'DevOps', impact: '+9% Readiness', done: false },
              { task: 'FastAPI Async Microservices & Auth', category: 'Backend', impact: '+8% Readiness', done: true },
              { task: 'Vector Search & Embeddings with FAISS', category: 'AI/RAG', impact: '+11% Readiness', done: false }
            ].map((t, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl border"
                   style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${t.done ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30' : 'bg-white/10 text-white/40'}`}>
                    <CheckCircle size={13} />
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${t.done ? 'line-through text-white/50' : 'text-white'}`}>{t.task}</div>
                    <div className="text-[10px] text-slate-400">{t.category}</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-300">{t.impact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
