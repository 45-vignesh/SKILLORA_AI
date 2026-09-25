import React from 'react';

export default function StatCard({ label, value, sub, icon: Icon, accent = '#4F46E5', trend }) {
  return (
    <div className="rounded-2xl p-5 border transition-all duration-200 hover:border-white/20" 
         style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium mb-1" style={{ color: '#8A8FAD' }}>{label}</div>
          <div className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{value}</div>
          {sub && <div className="text-[11px] mt-1" style={{ color: '#8A8FAD' }}>{sub}</div>}
          {trend && (
            <div className="text-[11px] mt-1.5 font-medium inline-flex items-center gap-0.5" 
                 style={{ color: trend.startsWith('+') ? '#10B981' : '#EF4444' }}>
              {trend}
            </div>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
            <Icon size={18} style={{ color: accent }} />
          </div>
        )}
      </div>
    </div>
  );
}
