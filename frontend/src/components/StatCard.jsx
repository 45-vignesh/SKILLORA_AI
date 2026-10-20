import React from 'react';

export default function StatCard({ label, value, sub, icon: Icon, accent = '#4F46E5', trend }) {
  return (
    <div className="rounded-2xl p-5 border relative overflow-hidden transition-all duration-300 hover:border-white/30 hover:-translate-y-0.5 group shadow-lg" 
         style={{ 
           background: `linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 55%, ${accent}18 100%)`, 
           borderColor: 'rgba(255, 255, 255, 0.12)',
           boxShadow: `0 4px 20px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)`
         }}>
      {/* Top luminous white-to-accent highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] opacity-80"
           style={{ background: `linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, ${accent} 70%, transparent 100%)` }} />
      
      {/* Ambient color reflection glow */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full blur-2xl opacity-25 pointer-events-none"
           style={{ background: accent }} />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <div className="text-xs font-semibold mb-1 tracking-wide" style={{ color: '#94A3B8' }}>{label}</div>
          <div className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: 'Fraunces, Outfit, sans-serif' }}>
            <span style={{ 
              background: `linear-gradient(135deg, #FFFFFF 65%, ${accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {value}
            </span>
          </div>
          {sub && <div className="text-[11px] mt-1" style={{ color: '#8A8FAD' }}>{sub}</div>}
          {trend && (
            <div className="text-[11px] mt-1.5 font-semibold inline-flex items-center gap-1 px-2 py-0.5 rounded-full" 
                 style={{ 
                   background: trend.startsWith('+') ? 'rgba(16, 185, 129, 0.14)' : 'rgba(239, 68, 68, 0.14)',
                   color: trend.startsWith('+') ? '#34D399' : '#F87171',
                   border: `1px solid ${trend.startsWith('+') ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`
                 }}>
              {trend}
            </div>
          )}
        </div>
        {Icon && (
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-md"
            style={{ 
              background: `linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, ${accent}35 100%)`, 
              border: `1px solid rgba(255, 255, 255, 0.25)`,
              boxShadow: `0 4px 12px ${accent}30`
            }}>
            <Icon size={19} color="white" />
          </div>
        )}
      </div>
    </div>
  );
}
