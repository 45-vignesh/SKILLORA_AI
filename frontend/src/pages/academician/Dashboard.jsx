import React from 'react';
import { GraduationCap, FlaskConical, Handshake, Award, Plus, ArrowRight, BookOpen, Calendar, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard';
import RoleLogo from '../../components/RoleLogo';

export default function AcademicianDashboard() {
  const navigate = useNavigate();
  const accent = '#10B981';

  return (
    <div className="space-y-6 relative">
      {/* Ambient Top Aurora (Emerald + Pure White Merge) */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-44 pointer-events-none opacity-40 blur-3xl"
           style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.35) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 70%)' }} />

      {/* Hero with Custom Academician Logo (Emerald + White Merge) */}
      <div className="rounded-2xl p-6 relative overflow-hidden border shadow-xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(16, 185, 129, 0.38) 45%, rgba(5, 150, 105, 0.22) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.22)',
          boxShadow: '0 8px 32px rgba(16, 185, 129, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)'
        }}>
        {/* Luminous Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
             style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, #34D399 50%, transparent 100%)' }} />

        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5 z-10">
          <div className="flex items-start gap-4">
            <RoleLogo role="ACADEMICIAN" size={58} className="ring-4 ring-white/20 shadow-2xl mt-1" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 border backdrop-blur-md"
                   style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.25)', color: '#FFFFFF' }}>
                <Sparkles size={12} className="text-emerald-300" /> Faculty Industrial Empowerment • Dr. Rajesh Sharma
              </div>
              <h1 className="text-2xl md:text-3xl font-black mb-1.5 tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                <span style={{ 
                  background: 'linear-gradient(135deg, #FFFFFF 40%, #D1FAE5 75%, #34D399 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>
                  Academic Research & Corporate Sabbatical Hub
                </span>
              </h1>
              <p className="text-sm max-w-xl text-slate-200 leading-relaxed">
                Bridge classroom curriculum with frontier corporate tech through faculty sabbaticals and sponsored R&D grants.
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/academician/fdp')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 flex-shrink-0 cursor-pointer border"
            style={{ 
              background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)', 
              borderColor: 'rgba(255, 255, 255, 0.35)',
              boxShadow: '0 4px 18px rgba(16, 185, 129, 0.5)' 
            }}>
            Explore FDP Programs <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Stats with White + Emerald Merge */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Enrolled FDPs" value="3" sub="2 Certified, 1 Active" icon={GraduationCap} accent="#34D399" trend="+1 this semester" />
        <StatCard label="Active R&D Grants" value="₹ 28.5 L" sub="Infosys & Intel sponsored" icon={FlaskConical} accent="#0EA5E9" />
        <StatCard label="Joint Patents & Papers" value="8" sub="4 Scopus Q1 indexed" icon={Award} accent="#F59E0B" />
        <StatCard label="Industry Mentor Rating" value="4.9 / 5" sub="Top 5% Faculty Mentors" icon={Handshake} accent="#6366F1" />
      </div>

      {/* Recent Initiatives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* FDPs */}
        <div className="rounded-2xl p-6 border shadow-lg space-y-4"
             style={{ 
               background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(16, 185, 129, 0.1) 100%)', 
               borderColor: 'rgba(255, 255, 255, 0.12)',
               boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)'
             }}>
          <div className="flex items-center justify-between">
            <div className="font-bold text-white text-sm">Industrial Faculty Upskilling (FDP)</div>
            <button onClick={() => navigate('/academician/fdp')} className="text-xs font-semibold flex items-center gap-1 cursor-pointer text-emerald-300 hover:text-white transition-colors">
              View All <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Generative AI & LLM Systems in Production', provider: 'Google Cloud India', duration: '4 Weeks', status: 'In Progress' },
              { title: 'Enterprise Cloud Microservices with Kubernetes', provider: 'Infosys Springboard', duration: '3 Weeks', status: 'Completed' }
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border flex items-center justify-between gap-3"
                   style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div>
                  <div className="font-bold text-white text-xs">{item.title}</div>
                  <div className="text-[11px] mt-0.5 text-slate-300">{item.provider} • {item.duration}</div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Research */}
        <div className="rounded-2xl p-6 border shadow-lg space-y-4"
             style={{ 
               background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(16, 185, 129, 0.1) 100%)', 
               borderColor: 'rgba(255, 255, 255, 0.12)',
               boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)'
             }}>
          <div className="flex items-center justify-between">
            <div className="font-bold text-white text-sm">Joint Industry R&D Projects</div>
            <button onClick={() => navigate('/academician/research')} className="text-xs font-semibold flex items-center gap-1 cursor-pointer text-emerald-300 hover:text-white transition-colors">
              All Projects <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Edge AI Obstacle Perception for Autonomous EV', sponsor: 'Tata Elxsi', grant: '₹ 15,00,000' },
              { title: 'Privacy-Preserving Federated Medical Imaging', sponsor: 'Intel Labs', grant: '₹ 13,50,000' }
            ].map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border flex items-center justify-between gap-3"
                   style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div>
                  <div className="font-bold text-white text-xs">{p.title}</div>
                  <div className="text-[11px] mt-0.5 text-slate-300">Sponsor: {p.sponsor}</div>
                </div>
                <span className="text-xs font-bold text-emerald-300">{p.grant}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
