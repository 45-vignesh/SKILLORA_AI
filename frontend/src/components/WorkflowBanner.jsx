import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const STEPS = [
  'Upload Resume', 'Skill Extract', 'Assessment', 'Skill Gap',
  'Career AI', 'Learning Path', 'Job Match', 'Apply', 'Portfolio'
];

export default function WorkflowBanner({ currentStep = 2, completedSteps = [] }) {
  const pct = Math.round((completedSteps.length / STEPS.length) * 100);
  const nextStep = STEPS[currentStep] || 'Complete';

  return (
    <div className="rounded-2xl p-5 mb-6 text-white overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}>
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-semibold opacity-90">AI Workflow Progress</div>
            <div className="text-2xl font-bold">{pct}% Complete</div>
          </div>
          <div className="flex items-center gap-1.5 bg-white/20 rounded-xl px-3 py-1.5 text-xs font-medium">
            <ArrowRight size={13} />
            Next: {nextStep}
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-1.5 mb-3">
          <div className="bg-white rounded-full h-1.5 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STEPS.map((step, i) => {
            const done = completedSteps.includes(i);
            const current = i === currentStep;
            return (
              <div key={i} className="flex items-center gap-1 flex-shrink-0">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  done ? 'bg-white/30' : current ? 'bg-white text-[#4F46E5]' : 'bg-white/10 opacity-60'
                }`}>
                  {done ? <Check size={10} /> : <span className="w-3.5 text-center">{i + 1}</span>}
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
