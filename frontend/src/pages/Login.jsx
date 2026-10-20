import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Building, BookOpen, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { authService } from '../services/authService';

const ROLES = [
  { key: 'STUDENT', label: 'Student', accent: '#4F46E5', desc: 'AI-guided career pathways, skill gap benchmarks & job matches', path: '/student/dashboard', instLabel: 'College / University', deptLabel: 'Branch / Department' },
  { key: 'INDUSTRY', label: 'Company', accent: '#0EA5E9', desc: 'Precision campus hiring with semantic AI candidate matching', path: '/company/dashboard', instLabel: 'Company Name', deptLabel: 'Industry Sector / Domain' },
  { key: 'ACADEMICIAN', label: 'Academician', accent: '#10B981', desc: 'Sponsored research grants, FDP sabbaticals & industry tie-ups', path: '/academician/dashboard', instLabel: 'University / Institute', deptLabel: 'Department / Specialization' },
  { key: 'INSTITUTION', label: 'Institution', accent: '#F59E0B', desc: 'Placement intelligence, batch readiness analytics & curriculum modernization', path: '/institution/dashboard', instLabel: 'Institution / College Name', deptLabel: 'State / Location' },
];

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [institutionOrCompany, setInstitutionOrCompany] = useState('');
  const [departmentOrDomain, setDepartmentOrDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const selectedRole = ROLES.find(r => r.key === role) || ROLES[0];
  const accent = selectedRole.accent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (isRegister) {
        if (!fullName.trim()) throw new Error('Please enter your full name');
        if (password.length < 6) throw new Error('Password must be at least 6 characters');

        await authService.register({
          email: email.trim(),
          password,
          full_name: fullName.trim(),
          role,
          institution_or_company: institutionOrCompany.trim() || undefined,
          department_or_domain: departmentOrDomain.trim() || undefined
        });
        setSuccessMsg('Account registered successfully! Redirecting...');
        setTimeout(() => navigate(selectedRole.path), 600);
      } else {
        await authService.login(email.trim(), password);
        navigate(selectedRole.path);
      }
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Authentication failed. Please verify your details.';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0F1020' }}>
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 w-5/12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #161233 0%, #0f1020 100%)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" 
                 style={{ background: accent, boxShadow: `0 4px 14px ${accent}40` }}>
              <Sparkles size={20} color="white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-wide" style={{ fontFamily: 'Fraunces, serif' }}>SKILLORA AI</span>
              <div className="text-[11px]" style={{ color: '#8A8FAD' }}>SIH26044 • Byte Squad</div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Fraunces, serif' }}>
            Bridging Academia & Industry with Explainable AI
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#8A8FAD' }}>
            A unified quad-stakeholder career ecosystem powered by vector semantic skill extraction, automated ATS diagnostics, and enterprise hiring pipelines.
          </p>
        </div>

        {/* Feature stats */}
        <div className="relative z-10 grid grid-cols-2 gap-3.5">
          {[
            ['Vector RAG', 'Semantic matching'],
            ['Real-Time ATS', 'Skill gap indexing'],
            ['Quad Portal', 'Multi-stakeholder'],
            ['PostgreSQL', 'Enterprise DB engine']
          ].map(([v, l]) => (
            <div key={v} className="rounded-2xl p-4 border" 
                 style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}>
              <div className="text-base font-bold text-white tracking-tight">{v}</div>
              <div className="text-xs mt-0.5" style={{ color: '#8A8FAD' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 overflow-y-auto">
        <div className="w-full max-w-md py-6">
          {/* Header & Mode Switcher */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
              {isRegister ? 'Create Your Account' : 'Welcome to Skillora'}
            </h2>
            <p className="text-xs" style={{ color: '#8A8FAD' }}>
              {isRegister 
                ? 'Register your profile to access role-specific intelligence tools' 
                : 'Sign in to access your customized dashboard and AI recommendations'}
            </p>

            <div className="flex justify-center p-1 rounded-xl border mt-5"
                 style={{ background: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
              <button
                type="button"
                onClick={() => { setIsRegister(false); setError(''); }}
                className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all"
                style={{
                  background: !isRegister ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  color: !isRegister ? '#ffffff' : '#8A8FAD'
                }}>
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsRegister(true); setError(''); }}
                className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all"
                style={{
                  background: isRegister ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  color: isRegister ? '#ffffff' : '#8A8FAD'
                }}>
                Create Account
              </button>
            </div>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {ROLES.map(r => (
              <button key={r.key}
                type="button"
                onClick={() => setRole(r.key)}
                className="p-3 rounded-xl border text-left transition-all"
                style={{
                  background: role === r.key ? `${r.accent}20` : 'rgba(255,255,255,0.03)',
                  borderColor: role === r.key ? r.accent : 'rgba(255,255,255,0.08)',
                  color: role === r.key ? '#ffffff' : '#8A8FAD'
                }}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs" style={{ color: role === r.key ? r.accent : '#ffffff' }}>{r.label}</span>
                  {role === r.key && <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.accent }} />}
                </div>
                <div className="text-[10px] mt-1 line-clamp-1" style={{ color: '#8A8FAD' }}>{r.desc}</div>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegister && (
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: '#8A8FAD' }}>Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                  <input 
                    type="text" 
                    required 
                    value={fullName} 
                    onChange={e => setFullName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs text-white outline-none border transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                    placeholder="e.g. Aarav Sharma"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#8A8FAD' }}>Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs text-white outline-none border transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#8A8FAD' }}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs text-white outline-none border transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isRegister && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#8A8FAD' }}>{selectedRole.instLabel}</label>
                  <div className="relative">
                    <Building size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                    <input 
                      type="text" 
                      value={institutionOrCompany} 
                      onChange={e => setInstitutionOrCompany(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl text-xs text-white outline-none border transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                      placeholder="e.g. NIT Bengaluru"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#8A8FAD' }}>{selectedRole.deptLabel}</label>
                  <div className="relative">
                    <BookOpen size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                    <input 
                      type="text" 
                      value={departmentOrDomain} 
                      onChange={e => setDepartmentOrDomain(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl text-xs text-white outline-none border transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                      placeholder="e.g. CSE / IT"
                    />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3.5 py-2.5">
                <AlertCircle size={15} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3.5 py-2.5">
                <CheckCircle2 size={15} className="flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-xs text-white flex items-center justify-center gap-2 transition-all shadow-lg mt-2 cursor-pointer"
              style={{ background: accent, opacity: loading ? 0.7 : 1, boxShadow: `0 4px 15px ${accent}40` }}>
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> {isRegister ? 'Creating Account...' : 'Signing in...'}</>
              ) : (
                <>{isRegister ? `Register as ${selectedRole.label}` : `Sign In as ${selectedRole.label}`} <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <div className="mt-5 text-center text-xs" style={{ color: '#8A8FAD' }}>
            {isRegister ? (
              <span>Already have an account? <button type="button" onClick={() => setIsRegister(false)} className="text-white underline font-medium">Sign in here</button></span>
            ) : (
              <span>Don't have an account? <button type="button" onClick={() => setIsRegister(true)} className="text-white underline font-medium">Register here</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
