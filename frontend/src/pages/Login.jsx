import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { authService } from '../services/authService';

const ROLES = [
  { key: 'STUDENT', label: 'Student', accent: '#4F46E5', desc: 'Discover your career path with AI-powered guidance', path: '/student/dashboard' },
  { key: 'INDUSTRY', label: 'Company', accent: '#0EA5E9', desc: 'Find top AI-matched talent for your open roles', path: '/company/dashboard' },
  { key: 'ACADEMICIAN', label: 'Academician', accent: '#10B981', desc: 'Manage research, FDPs and industry collaborations', path: '/academician/dashboard' },
  { key: 'INSTITUTION', label: 'Institution', accent: '#F59E0B', desc: 'Track placement readiness and student analytics', path: '/institution/dashboard' },
];

const DEMO = {
  STUDENT: 'student@skillora.ai',
  INDUSTRY: 'industry@skillora.ai',
  ACADEMICIAN: 'academician@skillora.ai',
  INSTITUTION: 'institution@skillora.ai',
};

export default function Login() {
  const [role, setRole] = useState('STUDENT');
  const [email, setEmail] = useState('student@skillora.ai');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const selectedRole = ROLES.find(r => r.key === role);
  const accent = selectedRole.accent;

  const handleRoleChange = (r) => {
    setRole(r);
    setEmail(DEMO[r]);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.login(email, password);
      navigate(selectedRole.path);
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0F1020' }}>
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 w-5/12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a1040 0%, #0f1020 100%)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: accent }}>
              <Sparkles size={20} color="white" />
            </div>
            <span className="text-white font-bold text-xl" style={{ fontFamily: 'Fraunces, serif' }}>SKILLORA AI</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
            Bridging Education & Industry
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#8A8FAD' }}>
            AI-powered skill gap analysis, career recommendations, and intelligent job matching — built for Smart India Hackathon 2026.
          </p>
        </div>
        <div className="relative grid grid-cols-2 gap-3">
          {[['20+', 'Students'], ['15+', 'Courses'], ['10+', 'Live Jobs'], ['98%', 'AI Accuracy']].map(([v, l]) => (
            <div key={l} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="text-2xl font-bold text-white">{v}</div>
              <div className="text-xs" style={{ color: '#8A8FAD' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-white text-2xl font-bold mb-1">Sign In</div>
            <div className="text-sm" style={{ color: '#8A8FAD' }}>Select your role and enter credentials</div>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {ROLES.map(r => (
              <button key={r.key}
                onClick={() => handleRoleChange(r.key)}
                className="p-3 rounded-xl border text-left transition-all"
                style={{
                  background: role === r.key ? `${r.accent}20` : 'rgba(255,255,255,0.03)',
                  borderColor: role === r.key ? r.accent : 'rgba(255,255,255,0.08)',
                  color: role === r.key ? r.accent : '#8A8FAD'
                }}>
                <div className="font-semibold text-sm">{r.label}</div>
                <div className="text-[11px] opacity-70 mt-0.5 leading-tight">{r.desc}</div>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8FAD' }}>Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white outline-none border transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    caretColor: accent
                  }}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8FAD' }}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white outline-none border transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <div className="text-xs text-red-400 bg-red-500/10 rounded-xl px-3 py-2">{error}</div>}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all"
              style={{ background: accent, opacity: loading ? 0.7 : 1 }}>
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Signing in...</>
                : <>Sign in as {selectedRole.label} <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="mt-4 text-center text-xs" style={{ color: '#3D4161' }}>
            Demo: <span style={{ color: '#8A8FAD' }}>{DEMO[role]}</span> / <span style={{ color: '#8A8FAD' }}>password123</span>
          </div>
        </div>
      </div>
    </div>
  );
}
