import React from 'react';
import { BarChart3, Users, Award, TrendingUp, ArrowRight, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import StatCard from '../../components/StatCard';
import RoleLogo from '../../components/RoleLogo';

const TREND_DATA = [
  { year: '2022', rate: 76 },
  { year: '2023', rate: 81 },
  { year: '2024', rate: 84 },
  { year: '2025', rate: 89 },
  { year: '2026 (Est.)', rate: 94 },
];

export default function InstitutionDashboard() {
  const navigate = useNavigate();
  const accent = '#F59E0B';

  return (
    <div className="space-y-6 relative">
      {/* Ambient Top Aurora (Amber + Pure White Merge) */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-44 pointer-events-none opacity-40 blur-3xl"
           style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.35) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 70%)' }} />

      {/* Hero with Custom Institution Logo (Amber + White Merge) */}
      <div className="rounded-2xl p-6 relative overflow-hidden border shadow-xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(245, 158, 11, 0.38) 45%, rgba(217, 119, 6, 0.22) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.22)',
          boxShadow: '0 8px 32px rgba(245, 158, 11, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)'
        }}>
        {/* Luminous Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
             style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, #FBBF24 50%, transparent 100%)' }} />

        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5 z-10">
          <div className="flex items-start gap-4">
            <RoleLogo role="INSTITUTION" size={58} className="ring-4 ring-white/20 shadow-2xl mt-1" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 border backdrop-blur-md"
                   style={{ background: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255, 255, 255, 0.25)', color: '#FFFFFF' }}>
                <Sparkles size={12} className="text-amber-300" /> Academic & Placement Analytics • NIT Bengaluru
              </div>
              <h1 className="text-2xl md:text-3xl font-black mb-1.5 tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
                <span style={{ 
                  background: 'linear-gradient(135deg, #FFFFFF 40%, #FEF3C7 75%, #FBBF24 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>
                  Institutional Placement & Curriculum Alignment Dashboard
                </span>
              </h1>
              <p className="text-sm max-w-xl text-slate-200 leading-relaxed">
                Track batch industry readiness, monitor recruiting drives, and detect curriculum deficits in real time.
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/institution/demand')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 flex-shrink-0 cursor-pointer border"
            style={{ 
              background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)', 
              borderColor: 'rgba(255, 255, 255, 0.35)',
              boxShadow: '0 4px 18px rgba(245, 158, 11, 0.5)' 
            }}>
            AI Curriculum Gap Engine <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Stats with White + Amber Merge */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Enrolled Students" value="1,240" sub="100% Verified Profiles" icon={Users} accent="#FBBF24" trend="+18% verified" />
        <StatCard label="Overall Placement Rate" value="84.5%" sub="457 / 540 Eligible Placed" icon={Award} accent="#10B981" trend="+5.5% YoY" />
        <StatCard label="Average CTC Package" value="8.4 LPA" sub="Highest: 34.5 LPA" icon={TrendingUp} accent="#0EA5E9" trend="+18% YoY" />
        <StatCard label="Corporate MoUs Signed" value="28" sub="14 Drives Active" icon={BarChart3} accent="#6366F1" />
      </div>

      {/* Trend & Department Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Placement Rate Trend Chart */}
        <div className="rounded-2xl p-6 border shadow-lg space-y-3"
             style={{ 
               background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(245, 158, 11, 0.1) 100%)', 
               borderColor: 'rgba(255, 255, 255, 0.12)',
               boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)'
             }}>
          <div className="font-bold text-white text-sm">Year-over-Year Placement Growth Trend</div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="year" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <YAxis stroke="#94A3B8" domain={[60, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#0F1020', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, color: 'white' }} />
                <Line type="monotone" dataKey="rate" stroke="#FBBF24" strokeWidth={3} dot={{ fill: '#FFFFFF', stroke: '#FBBF24', strokeWidth: 2, r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Readiness Table */}
        <div className="rounded-2xl p-6 border shadow-lg space-y-4"
             style={{ 
               background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 60%, rgba(245, 158, 11, 0.1) 100%)', 
               borderColor: 'rgba(255, 255, 255, 0.12)',
               boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)'
             }}>
          <div className="flex items-center justify-between">
            <div className="font-bold text-white text-sm">Department Placement Readiness</div>
            <button onClick={() => navigate('/institution/students')} className="text-xs font-semibold flex items-center gap-1 cursor-pointer text-amber-300 hover:text-white transition-colors">
              View Roster <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { dept: 'Computer Science & Engineering', placed: 89, color: '#10B981', status: 'Excellent' },
              { dept: 'Artificial Intelligence & Data Science', placed: 92, color: '#10B981', status: 'Excellent' },
              { dept: 'Information Technology', placed: 84, color: '#0EA5E9', status: 'Good' },
              { dept: 'Electronics & Communication', placed: 72, color: '#F59E0B', status: 'Needs Lab Attention' }
            ].map(d => (
              <div key={d.dept} className="p-3 rounded-xl border space-y-1.5"
                   style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-white">{d.dept}</span>
                  <span className="font-bold" style={{ color: d.color }}>{d.placed}% Placed</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden p-0.5 border border-white/10">
                  <div className="h-full rounded-full" style={{ width: `${d.placed}%`, background: `linear-gradient(90deg, #FFFFFF 0%, ${d.color} 100%)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
