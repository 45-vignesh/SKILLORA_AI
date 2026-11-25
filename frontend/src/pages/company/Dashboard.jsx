import React, { useState, useEffect } from 'react';
import { Briefcase, Users, CheckCircle2, TrendingUp, Plus, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import RoleLogo from '../../components/RoleLogo';
import { industryService } from '../../services/industryService';

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      industryService.getProfile(),
      industryService.getJobs(),
      industryService.getInternships(),
      industryService.getApplications(),
    ])
      .then(([profRes, jobsRes, intRes, appRes]) => {
        setProfile(profRes.data);
        setJobs(Array.isArray(jobsRes.data) ? jobsRes.data : []);
        setInternships(Array.isArray(intRes.data) ? intRes.data : []);
        setApplications(Array.isArray(appRes.data) ? appRes.data : []);
      })
      .catch(err => {
        setError(err.isForbidden ? 'Access denied: Industry role required.' : (err.response?.data?.detail || 'Failed to load company dashboard metrics.'));
      })
      .finally(() => setLoading(false));
  }, []);

  const totalOpenings = jobs.length + internships.length;
  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview Scheduled' || a.status === 'Selected').length;
  const combinedListings = [
    ...jobs.map(j => ({ id: `job-${j.id}`, title: j.title, type: j.job_type || 'Full-time', loc: j.location, applicants: j.applications_count ?? 0, active: j.is_active })),
    ...internships.map(i => ({ id: `int-${i.id}`, title: i.title, type: 'Internship', loc: i.location, applicants: i.applications_count ?? 0, active: i.is_active })),
  ];

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
                <Sparkles size={12} className="text-sky-300" /> Corporate Talent Hub • {profile?.company_name || 'Industry Portal'}
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
                You have {totalOpenings} active campus openings with {applications.length} candidate applications in your pipeline.
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

      {error && (
        <div className="rounded-xl p-3 border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Stats with White + Sky Blue Merge */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Openings" value={loading ? '...' : totalOpenings} sub="Jobs & internships" icon={Briefcase} accent="#38BDF8" />
        <StatCard label="Total Applicants" value={loading ? '...' : applications.length} sub="Semantic vector match" icon={Users} accent="#6366F1" />
        <StatCard label="Shortlisted" value={loading ? '...' : shortlistedCount} sub="Ready for interview" icon={CheckCircle2} accent="#10B981" />
        <StatCard label="Active Job Posts" value={loading ? '...' : jobs.length} sub={`${internships.length} Internships`} icon={TrendingUp} accent="#F59E0B" />
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

        {loading ? (
          <div className="text-xs text-slate-400 py-4">Loading company openings...</div>
        ) : combinedListings.length === 0 ? (
          <div className="text-xs text-slate-400 py-4">No active job or internship listings posted yet.</div>
        ) : (
          <div className="space-y-3">
            {combinedListings.map(item => (
              <div key={item.id} className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                   style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.title}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-white/10 text-white border border-white/20">{item.type}</span>
                  </div>
                  <div className="text-xs mt-1 text-slate-300">
                    {item.loc} • <span className="text-sky-300 font-semibold">{item.applicants} Candidates</span>
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
        )}
      </div>
    </div>
  );
}
