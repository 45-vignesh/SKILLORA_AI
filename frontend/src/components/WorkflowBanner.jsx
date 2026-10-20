import React from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

const STEPS = [
  'Upload Resume', 'Skill Extract', 'Assessment', 'Skill Gap',
  'Career AI', 'Learning Path', 'Job Match', 'Apply', 'Portfolio'
];

export default function WorkflowBanner({ currentStep = 2, completedSteps = [] }) {
  const pct = Math.round((completedSteps.length / STEPS.length) * 100);
  const nextStep = STEPS[currentStep] || 'Complete';

  return (
    <div className="rounded-2xl p-5 mb-6 text-white overflow-hidden relative shadow-xl border"
      style={{ 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, #4F46E5 40%, #7C3AED 100%)',
        borderColor: 'rgba(255, 255, 255, 0.25)',
        boxShadow: '0 8px 30px rgba(79, 70, 229, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
      }}>
      {/* Top subtle light reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px]"
           style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(199, 210, 254, 0.6) 50%, transparent 100%)' }} />

      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-indigo-100 flex items-center gap-1.5">
              <Sparkles size={12} className="text-yellow-300" /> AI Career Workflow Engine
            </div>
            <div className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
              <span style={{ background: 'linear-gradient(135deg, #FFFFFF 60%, #E0E7FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {pct}% Complete
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md border shadow-sm"
               style={{ background: 'rgba(255, 255, 255, 0.18)', borderColor: 'rgba(255, 255, 255, 0.35)' }}>
            <ArrowRight size={13} className="text-yellow-300" />
            <span>Next: {nextStep}</span>
          </div>
        </div>
        
        {/* Progress Bar with White-to-Cyan highlight */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-3.5 overflow-hidden p-0.5 border border-white/20">
          <div className="rounded-full h-full transition-all duration-500 shadow-sm" 
               style={{ 
                 width: `${pct}%`, 
                 background: 'linear-gradient(90deg, #FFFFFF 0%, #A5B4FC 60%, #38BDF8 100%)',
                 boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
               }} />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {STEPS.map((step, i) => {
            const done = completedSteps.includes(i);
            const current = i === currentStep;
            return (
              <div key={i} className="flex items-center gap-1 flex-shrink-0">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all border ${
                  done 
                    ? 'bg-white/25 border-white/30 text-white' 
                    : current 
                    ? 'bg-white text-[#4F46E5] border-white shadow-md' 
                    : 'bg-white/10 text-white/70 border-white/10'
                }`}>
                  {done ? <Check size={11} className="text-emerald-300" /> : <span className="w-3.5 text-center">{i + 1}</span>}
                  {step}
                </div>
                {i < STEPS.length - 1 && <div className="w-3 h-px bg-white/30" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
