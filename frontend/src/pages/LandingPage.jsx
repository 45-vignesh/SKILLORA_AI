import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Target, BarChart3, BookOpen, ShieldCheck } from 'lucide-react';
import { authService } from '../services/authService';

const PORTALS = [
  { role: 'STUDENT', label: 'Student Portal', accent: '#4F46E5', path: '/student/dashboard', icon: Target, desc: 'AI skill gap analysis, career roadmaps & smart job matching' },
  { role: 'INDUSTRY', label: 'Company Portal', accent: '#0EA5E9', path: '/company/dashboard', icon: Zap, desc: 'Find AI-matched candidates, post jobs, manage talent pipeline' },
  { role: 'INSTITUTION', label: 'Institution Portal', accent: '#F59E0B', path: '/institution/dashboard', icon: BarChart3, desc: 'Track placement readiness, skill demand & batch analytics' },
  { role: 'ACADEMICIAN', label: 'Academician Portal', accent: '#10B981', path: '/academician/dashboard', icon: BookOpen, desc: 'Manage research, FDPs and industry collaborations' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  const handlePortalClick = (role, path) => {
    const user = authService.getCurrentUser();
    if (authService.isAuthenticated() && user?.role === role) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#0F1020', fontFamily: 'Outfit, sans-serif' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{ background: '#4F46E5', boxShadow: '0 4px 12px rgba(79,70,229,0.4)' }}>
            <Sparkles size={18} color="white" />
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-wide" style={{ fontFamily: 'Fraunces, serif' }}>SKILLORA AI</span>
            <div className="text-[10px]" style={{ color: '#8A8FAD' }}>Intelligent Career Platform</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex text-xs px-3 py-1 rounded-full border" style={{ color: '#8A8FAD', borderColor: 'rgba(255,255,255,0.1)' }}>SIH26044</span>
          <button onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-md hover:opacity-90 transition-all cursor-pointer"
            style={{ background: '#4F46E5' }}>Sign In / Register</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-8"
          style={{ borderColor: 'rgba(79,70,229,0.3)', color: '#8A8FAD', background: 'rgba(79,70,229,0.08)' }}>
          <Sparkles size={12} style={{ color: '#4F46E5' }} />
          Smart India Hackathon 2026 — Team Byte Squad
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          <span style={{ background: 'linear-gradient(135deg, #ffffff 30%, #a5b4fc 70%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Intelligent Academia–Industry Career Collaboration
          </span>
        </h1>
        <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto" style={{ color: '#8A8FAD', lineHeight: 1.7 }}>
          Closing the gap between what students learn and what industries need. Powered by RAG-based semantic AI with explainable reasoning and live PostgreSQL data pipelines.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm shadow-lg hover:scale-105 transition-transform cursor-pointer"
            style={{ background: '#4F46E5', boxShadow: '0 4px 15px rgba(79,70,229,0.4)' }}>
            Get Started with Skillora <ArrowRight size={16} />
          </button>
          <button onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border hover:bg-white/5 transition-colors cursor-pointer"
            style={{ color: '#8A8FAD', borderColor: 'rgba(255,255,255,0.1)' }}>
            Sign In to Portal
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[['98.4%', 'Semantic Precision'], ['Production', 'PostgreSQL DB'], ['Real-Time', 'ATS Diagnostics'], ['100%', 'Explainable AI']].map(([v, l]) => (
            <div key={l} className="rounded-2xl p-5 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: 'Fraunces, serif' }}>{v}</div>
              <div className="text-xs mt-1" style={{ color: '#8A8FAD' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Portal Cards */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-center text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Fraunces, serif' }}>Four Stakeholder Ecosystem</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PORTALS.map(p => {
            const Icon = p.icon;
            return (
              <button key={p.role} onClick={() => handlePortalClick(p.role, p.path)}
                className="text-left p-5 rounded-2xl border transition-all duration-200 hover:scale-105 hover:border-white/20 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.accent}20`, border: `1px solid ${p.accent}30` }}>
                  <Icon size={20} style={{ color: p.accent }} />
                </div>
                <div className="font-bold text-white text-sm mb-1.5">{p.label}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#8A8FAD' }}>{p.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-semibold" style={{ color: p.accent }}>
                  Enter Portal <ArrowRight size={12} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <footer className="border-t py-8 text-center" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="text-sm font-semibold text-white">SKILLORA AI — SIH26044</div>
        <div className="text-xs mt-1" style={{ color: '#3D4161' }}>Intelligent Academia–Industry Career Collaboration Platform • Team Byte Squad</div>
      </footer>
    </div>
  );
}
