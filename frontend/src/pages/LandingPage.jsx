import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Target, BarChart3, BookOpen } from 'lucide-react';
import { authService } from '../services/authService';

const PORTALS = [
  { role: 'STUDENT', email: 'student@skillora.ai', label: 'Student', accent: '#4F46E5', path: '/student/dashboard', icon: Target, desc: 'AI skill gap analysis, career roadmaps & smart job matching' },
  { role: 'INDUSTRY', email: 'industry@skillora.ai', label: 'Company', accent: '#0EA5E9', path: '/company/dashboard', icon: Zap, desc: 'Find AI-matched candidates, post jobs, manage pipeline' },
  { role: 'INSTITUTION', email: 'institution@skillora.ai', label: 'Institution', accent: '#F59E0B', path: '/institution/dashboard', icon: BarChart3, desc: 'Track placement readiness, skill demand & batch analytics' },
  { role: 'ACADEMICIAN', email: 'academician@skillora.ai', label: 'Academician', accent: '#10B981', path: '/academician/dashboard', icon: BookOpen, desc: 'Manage research, FDPs and industry collaborations' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  const launch = async (email, path) => {
    try { await authService.login(email, 'password123'); } catch (e) { /* ignore */ }
    navigate(path);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0F1020', fontFamily: 'Outfit, sans-serif' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#4F46E5' }}>
            <Sparkles size={18} color="white" />
          </div>
          <span className="text-white font-bold text-lg" style={{ fontFamily: 'Fraunces, serif' }}>SKILLORA AI</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1 rounded-full border" style={{ color: '#8A8FAD', borderColor: 'rgba(255,255,255,0.1)' }}>SIH26044</span>
          <button onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: '#4F46E5' }}>Sign In</button>
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
        <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: '#8A8FAD', lineHeight: 1.7 }}>
          Closing the gap between what students learn and what industries need. Powered by RAG-based semantic AI with fully explainable reasoning.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => launch('student@skillora.ai', '/student/dashboard')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
            style={{ background: '#4F46E5' }}>
            Launch Student Portal <ArrowRight size={16} />
          </button>
          <button onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border"
            style={{ color: '#8A8FAD', borderColor: 'rgba(255,255,255,0.1)' }}>
            Explore All Portals
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[['98.4%', 'RAG Precision'], ['20+', 'Student Profiles'], ['24', 'Live Listings'], ['100%', 'Explainable AI']].map(([v, l]) => (
            <div key={l} className="rounded-2xl p-5 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="text-3xl font-black text-white" style={{ fontFamily: 'Fraunces, serif' }}>{v}</div>
              <div className="text-xs mt-1" style={{ color: '#8A8FAD' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Portal Cards */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-center text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Fraunces, serif' }}>Four Stakeholder Portals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PORTALS.map(p => {
            const Icon = p.icon;
            return (
              <button key={p.role} onClick={() => launch(p.email, p.path)}
                className="text-left p-5 rounded-2xl border transition-all hover:scale-105 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${p.accent}20` }}>
                  <Icon size={20} style={{ color: p.accent }} />
                </div>
                <div className="font-bold text-white mb-2">{p.label}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#8A8FAD' }}>{p.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-medium" style={{ color: p.accent }}>
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
