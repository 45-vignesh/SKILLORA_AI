import React from 'react';
import { GraduationCap, FlaskConical, Handshake, Award, Plus, ArrowRight, BookOpen, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';

export default function AcademicianDashboard() {
  const navigate = useNavigate();
  const accent = '#10B981';

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl p-6 relative overflow-hidden border"
        style={{ 
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.12) 100%)',
          borderColor: 'rgba(16, 185, 129, 0.3)'
        }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2"
                 style={{ background: 'rgba(16, 185, 129, 0.25)', color: '#6EE7B7' }}>
              Faculty Industrial Empowerment • Dr. Rajesh Sharma
            </div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Fraunces, serif' }}>
              Academic Research & Corporate Sabbatical Hub
            </h1>
            <p className="text-sm max-w-xl" style={{ color: '#8A8FAD' }}>
              Bridge classroom curriculum with frontier corporate tech through faculty sabbaticals and sponsored R&D grants.
            </p>
          </div>
          <button 
            onClick={() => navigate('/academician/fdp')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 flex-shrink-0"
            style={{ background: accent, boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}>
            Explore FDP Programs <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Enrolled FDPs" value="3" sub="2 Certified, 1 Active" icon={GraduationCap} accent={accent} trend="+1 this semester" />
        <StatCard label="Active R&D Grants" value="₹ 28.5 L" sub="Infosys & Intel sponsored" icon={FlaskConical} accent="#0EA5E9" />
        <StatCard label="Joint Patents & Papers" value="8" sub="4 Scopus Q1 indexed" icon={Award} accent="#F59E0B" />
        <StatCard label="Industry Mentor Rating" value="4.9 / 5" sub="Top 5% Faculty Mentors" icon={Handshake} accent="#4F46E5" />
      </div>

      {/* Recent Initiatives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* FDPs */}
        <div className="rounded-2xl p-6 border space-y-4"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="flex items-center justify-between">
            <div className="font-semibold text-white text-sm">Industrial Faculty Upskilling (FDP)</div>
            <button onClick={() => navigate('/academician/fdp')} className="text-xs font-medium flex items-center gap-1" style={{ color: accent }}>
              View All <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Generative AI & LLM Systems in Production', provider: 'Google Cloud India', duration: '4 Weeks', status: 'In Progress' },
              { title: 'Enterprise Cloud Microservices with Kubernetes', provider: 'Infosys Springboard', duration: '3 Weeks', status: 'Completed' }
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border flex items-center justify-between gap-3"
                   style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div>
                  <div className="font-bold text-white text-xs">{item.title}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: '#8A8FAD' }}>{item.provider} • {item.duration}</div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Research */}
        <div className="rounded-2xl p-6 border space-y-4"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="flex items-center justify-between">
            <div className="font-semibold text-white text-sm">Joint Industry R&D Projects</div>
            <button onClick={() => navigate('/academician/research')} className="text-xs font-medium flex items-center gap-1" style={{ color: accent }}>
              All Projects <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Edge AI Obstacle Perception for Autonomous EV', sponsor: 'Tata Elxsi', grant: '₹ 15,00,000' },
              { title: 'Privacy-Preserving Federated Medical Imaging', sponsor: 'Intel Labs', grant: '₹ 13,50,000' }
            ].map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border flex items-center justify-between gap-3"
                   style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div>
                  <div className="font-bold text-white text-xs">{p.title}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: '#8A8FAD' }}>Sponsor: {p.sponsor}</div>
                </div>
                <span className="text-xs font-bold text-emerald-400">{p.grant}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
