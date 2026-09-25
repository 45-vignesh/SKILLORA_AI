import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, CheckSquare, TrendingUp, Compass,
  Briefcase, ClipboardList, BookOpen, User, LogOut, Menu, X,
  Bell, Sparkles, Search, Users,
  FlaskConical, Handshake, BarChart3, GraduationCap
} from 'lucide-react';
import { authService } from '../services/authService';

const NAV = {
  STUDENT: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { label: 'Resume AI', icon: FileText, path: '/student/resume' },
    { label: 'Skill Assessment', icon: CheckSquare, path: '/student/assessment' },
    { label: 'Skill Gap', icon: TrendingUp, path: '/student/skill-gap' },
    { label: 'Career AI', icon: Compass, path: '/student/career' },
    { label: 'Jobs & Internships', icon: Briefcase, path: '/student/jobs' },
    { label: 'Applications', icon: ClipboardList, path: '/student/applications' },
    { label: 'Learning Path', icon: BookOpen, path: '/student/learning-path' },
    { label: 'Portfolio', icon: User, path: '/student/portfolio' },
  ],
  INDUSTRY: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/company/dashboard' },
    { label: 'Post Job / Intern', icon: Briefcase, path: '/company/post-job' },
    { label: 'Candidate Search', icon: Search, path: '/company/candidates' },
    { label: 'Applications', icon: ClipboardList, path: '/company/applications' },
  ],
  ACADEMICIAN: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/academician/dashboard' },
    { label: 'FDP & Training', icon: GraduationCap, path: '/academician/fdp' },
    { label: 'Research', icon: FlaskConical, path: '/academician/research' },
    { label: 'Collaborations', icon: Handshake, path: '/academician/collaborations' },
  ],
  INSTITUTION: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/institution/dashboard' },
    { label: 'Student Analytics', icon: Users, path: '/institution/students' },
    { label: 'Placement Tracker', icon: BarChart3, path: '/institution/placement' },
    { label: 'Industry Demand', icon: TrendingUp, path: '/institution/demand' },
  ],
};

const ROLE_ACCENT = {
  STUDENT: '#4F46E5',
  INDUSTRY: '#0EA5E9',
  ACADEMICIAN: '#10B981',
  INSTITUTION: '#F59E0B',
};

const ROLE_LABEL = {
  STUDENT: 'Student Portal',
  INDUSTRY: 'Company Portal',
  ACADEMICIAN: 'Academician Portal',
  INSTITUTION: 'Institution Portal',
};

function SidebarContent({ user, accent, navItems, location, navigate, setMobileOpen }) {
  return (
    <div className="flex flex-col h-full select-none" style={{ background: '#0F1020' }}>
      {/* Brand */}
      <div className="p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" 
               style={{ background: accent, boxShadow: `0 4px 14px ${accent}40` }}>
            <Sparkles size={18} color="white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm leading-tight tracking-wide" style={{ fontFamily: 'Fraunces, serif' }}>
              SKILLORA AI
            </div>
            <div className="text-[10px] font-medium" style={{ color: '#8A8FAD' }}>SIH26044 • Byte Squad</div>
          </div>
        </div>
        <div className="mt-3 text-[11px] font-semibold px-1 tracking-wider uppercase" style={{ color: '#3D4161' }}>
          {ROLE_LABEL[user.role]}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-1">
        <div className="text-[10px] font-bold mb-2 px-2 tracking-wider" style={{ color: '#3D4161' }}>NAVIGATION</div>
        {navItems.map(item => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
              style={{
                background: active ? `${accent}18` : 'transparent',
                borderLeft: active ? `3px solid ${accent}` : '3px solid transparent',
                color: active ? '#ffffff' : '#8A8FAD',
                fontWeight: active ? 600 : 400,
                fontSize: 13,
                boxShadow: active ? `0 2px 10px ${accent}15` : 'none'
              }}
            >
              <Icon size={16} style={{ color: active ? accent : '#8A8FAD' }} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Demo Switcher */}
      <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="text-[10px] font-bold mb-2 px-2 tracking-wider" style={{ color: '#3D4161' }}>ROLE SWITCHER</div>
        {authService.demoAccounts.map(acc => (
          <button key={acc.role}
            onClick={async () => {
              try { await authService.login(acc.email, 'password123'); } catch (e) { /* ignore */ }
              window.location.href = acc.path;
            }}
            className="w-full text-left px-3 py-1.5 rounded-lg mb-0.5 text-[11px] transition-all duration-150 hover:bg-white/5"
            style={{ 
              color: user.email === acc.email ? accent : '#8A8FAD', 
              fontWeight: user.email === acc.email ? 600 : 400,
              background: user.email === acc.email ? 'rgba(255,255,255,0.04)' : 'transparent'
            }}
          >
            {user.email === acc.email ? '● ' : '○ '}{acc.label}
          </button>
        ))}
      </div>

      {/* User + Logout */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: accent }}>
            {user.full_name?.[0] || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">{user.full_name}</div>
            <div className="text-[10px] truncate" style={{ color: '#8A8FAD' }}>{user.email}</div>
          </div>
        </div>
        <button onClick={() => authService.logout()}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-all hover:bg-red-500/10"
          style={{ color: '#ef4444' }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = authService.getCurrentUser() || { full_name: 'Aarav Sharma', role: 'STUDENT', email: 'student@skillora.ai' };
  const accent = ROLE_ACCENT[user.role] || '#4F46E5';
  const navItems = NAV[user.role] || NAV.STUDENT;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0F1020', color: '#F8FAFC' }}>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col flex-shrink-0 border-r" style={{ width: 256, borderColor: 'rgba(255,255,255,0.07)' }}>
        <SidebarContent
          user={user} accent={accent} navItems={navItems}
          location={location} navigate={navigate} setMobileOpen={setMobileOpen}
        />
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 flex flex-col" style={{ width: 288 }}>
            <button onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-white z-10 p-1 rounded-lg bg-white/10">
              <X size={18} />
            </button>
            <SidebarContent
              user={user} accent={accent} navItems={navItems}
              location={location} navigate={navigate} setMobileOpen={setMobileOpen}
            />
          </div>
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#0F1020' }}>
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-7 py-3.5 border-b flex-shrink-0 backdrop-blur-md"
          style={{ background: 'rgba(15, 16, 32, 0.75)', borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1.5 rounded-lg bg-white/5 text-white" onClick={() => setMobileOpen(true)}>
              <Menu size={18} />
            </button>
            <div>
              <div className="text-sm font-semibold text-white tracking-tight">
                Welcome back, {user.full_name?.split(' ')[0]} 👋
              </div>
              <div className="text-[11px]" style={{ color: '#8A8FAD' }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}30` }}>
              <Sparkles size={11} /> AI Engine Active
            </span>
            <button className="relative p-2 rounded-xl border transition-colors hover:bg-white/5" 
                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <Bell size={15} style={{ color: '#8A8FAD' }} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: '#EF4444' }} />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 shadow-md cursor-pointer"
              style={{ background: accent, borderColor: 'rgba(255,255,255,0.1)' }}>
              {user.full_name?.[0] || 'U'}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto" style={{ background: '#0F1020' }}>
          <div className="max-w-7xl mx-auto p-4 md:p-7">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
