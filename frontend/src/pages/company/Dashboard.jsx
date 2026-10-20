import React from 'react';
import { Briefcase, Users, CheckCircle2, TrendingUp, Plus, ArrowRight, MapPin, DollarSign, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import RoleLogo from '../../components/RoleLogo';

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const accent = '#0EA5E9';

  return (
    <div className="space-y-6 relative">
      {/* Ambient Top Aurora (Sky Blue + Pure White Merge) */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-44 pointer-events-none opacity-40 blur-3xl"
           style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(14, 165, 233, 0.35) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 70%)' }} />

      {/* Hero with Custom Company Logo (Sky Blue + White Merge) */}
      <div className="rounded-2xl p-6 relative overflow-hidden border shadow-xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(14, 165, 233, 0.38) 45%, rgba(37, 99, 235, 0.22) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.22)',
          boxShadow: '0 8px 32px rgba(14, 165, 233, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)'
        }}>
        {/* Luminous Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
             style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, #38BDF8 50%, transparent 100%)' }} />

        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5 z-10">
          <div className="flex items-start gap-4">
            <RoleLogo role="INDUSTRY" size={58} className="ring-4 ring-white/20 shadow-2xl mt-1" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 border backdrop-blur-md"
                   style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.25)', color: '#FFFFFF' }}>
                <Sparkles size={12} className="text-sky-300" /> Corporate Talent Hub • TechNova Systems
              </div>
              <h1 className="text-2xl md:text-3xl font-black mb-1.5 tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                <span style={{ 
                  background: 'linear-gradient(135deg, #FFFFFF 40%, #E0F2FE 75%, #38BDF8 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>
                  Precision Campus Recruitment & AI Talent Pipeline
                </span>
              </h1>
              <p className="text-sm max-w-xl text-slate-200 leading-relaxed">
                You have 3 active campus openings receiving AI semantic candidate matches with 85%+ readiness.
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/company/post-job')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 flex-shrink-0 cursor-pointer border"
            style={{ 
              background: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)', 
              borderColor: 'rgba(255, 255, 255, 0.35)',
              boxShadow: '0 4px 18px rgba(14, 165, 233, 0.5)' 
            }}>
            <Plus size={16} /> Post New Opportunity
          </button>
        </div>
      </div>

      {/* Stats with White + Sky Blue Merge */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Openings" value="6" sub="Jobs & internships" icon={Briefcase} accent="#38BDF8" trend="+2 this week" />
        <StatCard label="Candidates Matched" value="142" sub="Semantic vector match" icon={Users} accent="#6366F1" trend="+18 new" />
        <StatCard label="Shortlisted" value="28" sub="Ready for interview" icon={CheckCircle2} accent="#10B981" />
        <StatCard label="Campus Placement Drives" value="3" sub="Upcoming sessions" icon={TrendingUp} accent="#F59E0B" />
      </div>

      {/* Active Listings */}
      <div className="rounded-2xl p-6 border shadow-lg space-y-4"
           style={{ 
             background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(14, 165, 233, 0.1) 100%)', 
             borderColor: 'rgba(255, 255, 255, 0.12)',
             boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)'
           }}>
        <div className="flex items-center justify-between">
          <div className="font-bold text-white text-sm">Active Job Openings & Hiring Status</div>
          <button onClick={() => navigate('/company/candidates')} className="text-xs font-semibold flex items-center gap-1 cursor-pointer text-sky-300 hover:text-white transition-colors">
            Search Talent Pool <ArrowRight size={12} />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { title: 'Junior Full Stack Developer', type: 'Full-time', loc: 'Bengaluru', applicants: 38, avgMatch: 88, status: 'Active' },
            { title: 'Cloud Backend Engineer Intern', type: 'Internship', loc: 'Remote', applicants: 54, avgMatch: 82, status: 'Active' },
            { title: 'DevOps & Infrastructure Associate', type: 'Full-time', loc: 'Hyderabad', applicants: 21, avgMatch: 76, status: 'Reviewing' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                 style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{item.title}</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-white/10 text-white border border-white/20">{item.type}</span>
                </div>
                <div className="text-xs mt-1 text-slate-300">
                  {item.loc} • <span className="text-sky-300 font-semibold">{item.applicants} Candidates</span> • Avg Match: <span className="text-emerald-400 font-bold">{item.avgMatch}%</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/company/applications')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white border hover:bg-white/10 transition-colors cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)' }}>
                  View Pipeline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
