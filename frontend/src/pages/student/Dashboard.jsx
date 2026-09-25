import React, { useState, useEffect } from 'react';
import { FileText, TrendingUp, Briefcase, Award, Target, Zap, ArrowRight, CheckCircle, Sparkles, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import WorkflowBanner from '../../components/WorkflowBanner';
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
    { label: 'Upload Resume', desc: 'AI ATS & Skill Extraction', icon: FileText, path: '/student/resume', color: '#4F46E5' },
    { label: 'Skill Assessment', desc: 'Adaptive Benchmark Quiz', icon: CheckCircle, path: '/student/assessment', color: '#0EA5E9' },
    { label: 'Skill Gap Analysis', desc: 'Target vs Reality Matrix', icon: TrendingUp, path: '/student/skill-gap', color: '#10B981' },
    { label: 'AI Job Matching', desc: 'Semantic Vector Match', icon: Briefcase, path: '/student/jobs', color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      <WorkflowBanner currentStep={2} completedSteps={[0, 1]} />

      {/* Hero Welcome Banner */}
      <div className="rounded-2xl p-6 relative overflow-hidden border"
        style={{ 
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.25) 0%, rgba(124, 58, 237, 0.15) 100%)',
          borderColor: 'rgba(79, 70, 229, 0.3)'
        }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2"
                 style={{ background: 'rgba(79, 70, 229, 0.25)', color: '#A5B4FC' }}>
              <Sparkles size={12} /> Target Role: Full Stack Developer
            </div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Fraunces, serif' }}>
              Accelerate Your Placement Readiness
            </h1>
            <p className="text-sm max-w-xl" style={{ color: '#8A8FAD' }}>
              Your profile is matched with 24 live industry listings. Complete containerization modules to boost readiness to 90%+.
            </p>
          </div>
          <button 
            onClick={() => navigate('/student/skill-gap')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 flex-shrink-0"
            style={{ background: accent, boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)' }}>
            View Skill Gap <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* 4 KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Readiness Score" value={data?.readiness_score ? `${data.readiness_score}%` : '74%'} sub="Placement benchmark" icon={Target} accent={accent} trend="+12% this month" />
        <StatCard label="Verified Skills" value={data?.skills_count || 14} sub="Resume & quiz validated" icon={Zap} accent="#10B981" />
        <StatCard label="AI Job Matches" value={data?.job_matches || 9} sub="High alignment jobs" icon={Briefcase} accent="#0EA5E9" />
        <StatCard label="Active Applications" value={data?.applications || 4} sub="In hiring pipeline" icon={Award} accent="#F59E0B" />
      </div>

      {/* Quick Actions */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#8A8FAD' }}>Core Actions</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {quickActions.map(a => {
            const Icon = a.icon;
            return (
              <button 
                key={a.label} 
                onClick={() => navigate(a.path)}
                className="rounded-2xl p-4 text-left border transition-all duration-200 hover:border-white/20 hover:scale-[1.02] group"
                style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${a.color}20`, border: `1px solid ${a.color}35` }}>
                  <Icon size={18} style={{ color: a.color }} />
                </div>
                <div className="font-semibold text-sm text-white">{a.label}</div>
                <div className="text-xs mt-0.5" style={{ color: '#8A8FAD' }}>{a.desc}</div>
                <div className="flex items-center gap-1 mt-3 text-xs font-medium" style={{ color: a.color }}>
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
        <div className="rounded-2xl p-5 border" style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white text-sm">Target Role Alignments</div>
            <button onClick={() => navigate('/student/career')} className="text-xs font-medium flex items-center gap-1" style={{ color: accent }}>
              Explore All <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3.5">
            {[
              { role: 'Full Stack Web Developer', match: 86, color: '#4F46E5', desc: 'React, Node, Python, SQL' },
              { role: 'Backend Microservices Engineer', match: 78, color: '#0EA5E9', desc: 'FastAPI, Docker, PostgreSQL' },
              { role: 'AI / ML Engineer', match: 64, color: '#10B981', desc: 'PyTorch, scikit-learn, Vector DBs' }
            ].map(r => (
              <div key={r.role} className="p-3 rounded-xl border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-white">{r.role}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" 
                        style={{ background: `${r.color}20`, color: r.color }}>{r.match}% Match</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 mb-1.5 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${r.match}%`, background: r.color }} />
                </div>
                <div className="text-[11px]" style={{ color: '#8A8FAD' }}>Key Skills: {r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Actions */}
        <div className="rounded-2xl p-5 border" style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white text-sm">Top Priority Learning Tasks</div>
            <button onClick={() => navigate('/student/learning-path')} className="text-xs font-medium flex items-center gap-1" style={{ color: accent }}>
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
                   style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${t.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'}`}>
                    <CheckCircle size={13} />
                  </div>
                  <div>
                    <div className={`text-xs font-medium ${t.done ? 'line-through text-white/50' : 'text-white'}`}>{t.task}</div>
                    <div className="text-[10px]" style={{ color: '#8A8FAD' }}>{t.category}</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400">{t.impact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
