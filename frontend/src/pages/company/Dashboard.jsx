import React from 'react';
import { Briefcase, Users, CheckCircle2, TrendingUp, Plus, ArrowRight, MapPin, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const accent = '#0EA5E9';

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl p-6 relative overflow-hidden border"
        style={{ 
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.22) 0%, rgba(37, 99, 235, 0.12) 100%)',
          borderColor: 'rgba(14, 165, 233, 0.3)'
        }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2"
                 style={{ background: 'rgba(14, 165, 233, 0.25)', color: '#7DD3FC' }}>
              Corporate Talent Hub • TechNova Systems
            </div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Fraunces, serif' }}>
              Precision Campus Recruitment & AI Talent Pipeline
            </h1>
            <p className="text-sm max-w-xl" style={{ color: '#8A8FAD' }}>
              You have 3 active campus openings receiving AI semantic candidate matches with 85%+ readiness.
            </p>
          </div>
          <button 
            onClick={() => navigate('/company/post-job')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 flex-shrink-0"
            style={{ background: accent, boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)' }}>
            <Plus size={16} /> Post New Opportunity
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Openings" value="6" sub="Jobs & internships" icon={Briefcase} accent={accent} trend="+2 this week" />
        <StatCard label="Candidates Matched" value="142" sub="Semantic vector match" icon={Users} accent="#4F46E5" trend="+18 new" />
        <StatCard label="Shortlisted" value="28" sub="Ready for interview" icon={CheckCircle2} accent="#10B981" />
        <StatCard label="Campus Placement Drives" value="3" sub="Upcoming sessions" icon={TrendingUp} accent="#F59E0B" />
      </div>

      {/* Active Listings */}
      <div className="rounded-2xl p-6 border space-y-4"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="flex items-center justify-between">
          <div className="font-semibold text-white text-sm">Active Job Openings & Hiring Status</div>
          <button onClick={() => navigate('/company/candidates')} className="text-xs font-medium flex items-center gap-1" style={{ color: accent }}>
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
                 style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{item.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-white/10 text-white/80 border border-white/10">{item.type}</span>
                </div>
                <div className="text-xs mt-1" style={{ color: '#8A8FAD' }}>
                  {item.loc} • <span className="text-sky-400 font-medium">{item.applicants} Candidates</span> • Avg Match: <span className="text-emerald-400 font-bold">{item.avgMatch}%</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/company/applications')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white border hover:bg-white/10 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
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
