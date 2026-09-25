import React from 'react';
import { BarChart3, Users, Award, TrendingUp, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import StatCard from '../../components/StatCard';

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
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl p-6 relative overflow-hidden border"
        style={{ 
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.12) 100%)',
          borderColor: 'rgba(245, 158, 11, 0.3)'
        }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2"
                 style={{ background: 'rgba(245, 158, 11, 0.25)', color: '#FCD34D' }}>
              Academic & Placement Analytics • NIT Bengaluru
            </div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Fraunces, serif' }}>
              Institutional Placement & Curriculum Alignment Dashboard
            </h1>
            <p className="text-sm max-w-xl" style={{ color: '#8A8FAD' }}>
              Track batch industry readiness, monitor recruiting drives, and detect curriculum deficits in real time.
            </p>
          </div>
          <button 
            onClick={() => navigate('/institution/demand')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 flex-shrink-0"
            style={{ background: accent, boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)' }}>
            AI Curriculum Gap Engine <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Enrolled Students" value="1,240" sub="100% Verified Profiles" icon={Users} accent={accent} trend="+18% verified" />
        <StatCard label="Overall Placement Rate" value="84.5%" sub="457 / 540 Eligible Placed" icon={Award} accent="#10B981" trend="+5.5% YoY" />
        <StatCard label="Average CTC Package" value="8.4 LPA" sub="Highest: 34.5 LPA" icon={TrendingUp} accent="#0EA5E9" trend="+18% YoY" />
        <StatCard label="Corporate MoUs Signed" value="28" sub="14 Drives Active" icon={BarChart3} accent="#4F46E5" />
      </div>

      {/* Trend & Department Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Placement Rate Trend Chart */}
        <div className="rounded-2xl p-6 border space-y-3"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="font-semibold text-white text-sm">Year-over-Year Placement Growth Trend</div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="year" stroke="#8A8FAD" tick={{ fill: '#8A8FAD', fontSize: 11 }} />
                <YAxis stroke="#8A8FAD" domain={[60, 100]} tick={{ fill: '#8A8FAD', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#0F1020', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                <Line type="monotone" dataKey="rate" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Readiness Table */}
        <div className="rounded-2xl p-6 border space-y-4"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="flex items-center justify-between">
            <div className="font-semibold text-white text-sm">Department Placement Readiness</div>
            <button onClick={() => navigate('/institution/students')} className="text-xs font-medium flex items-center gap-1" style={{ color: accent }}>
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
                   style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-white">{d.dept}</span>
                  <span className="font-bold" style={{ color: d.color }}>{d.placed}% Placed</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${d.placed}%`, background: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
