import React, { useState } from 'react';
import { CheckCircle2, Clock, Award, ArrowRight, RotateCcw } from 'lucide-react';
import WorkflowBanner from '../../components/WorkflowBanner';
import API from '../../services/api';

const QUESTIONS = [
  {
    id: 1,
    skill: 'Python & FastAPI',
    question: 'In FastAPI, which library provides the underlying ASGI asynchronous web framework?',
    options: ['Starlette', 'Flask', 'Django Channels', 'Tornado'],
    correct: 0
  },
  {
    id: 2,
    skill: 'Databases & ORM',
    question: 'Which index type is best optimized for equality lookups in PostgreSQL?',
    options: ['B-Tree', 'Hash Index', 'GIN', 'GiST'],
    correct: 1
  },
  {
    id: 3,
    skill: 'Modern React',
    question: 'What is the primary benefit of React 18 Transitions (startTransition)?',
    options: ['Avoid memory leaks', 'Keep the UI responsive during heavy state updates', 'Speed up bundle compilation', 'Auto-memorize components'],
    correct: 1
  },
  {
    id: 4,
    skill: 'Docker & DevOps',
    question: 'Which Dockerfile instruction creates an image layer that caches installed dependencies?',
    options: ['COPY package.json . && RUN npm install', 'CMD ["npm", "start"]', 'EXPOSE 3000', 'ENV NODE_ENV=production'],
    correct: 0
  }
];

export default function SkillAssessment() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (idx) => {
    setSelected({ ...selected, [current]: idx });
  };

  const handleSubmit = () => {
    let correct = 0;
    QUESTIONS.forEach((q, i) => {
      if (selected[i] === q.correct) correct++;
    });
    const finalPct = Math.round((correct / QUESTIONS.length) * 100);
    setScore(finalPct);
    setSubmitted(true);
    API.post('/assessment/submit', { answers: selected, score: finalPct }).catch(() => {});
  };

  const q = QUESTIONS[current];

  return (
    <div className="space-y-6">
      <WorkflowBanner currentStep={2} completedSteps={[0, 1]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
            Adaptive Skill Assessment
          </h1>
          <p className="text-xs" style={{ color: '#8A8FAD' }}>
            Validate your technical proficiency through standardized industry questions
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs"
             style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#8A8FAD' }}>
          <Clock size={13} style={{ color: '#0EA5E9' }} /> 12 mins remaining
        </div>
      </div>

      {!submitted ? (
        <div className="rounded-2xl p-6 border space-y-6"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          {/* Question Step Indicator */}
          <div className="flex items-center justify-between text-xs" style={{ color: '#8A8FAD' }}>
            <span>Question {current + 1} of {QUESTIONS.length}</span>
            <span className="text-indigo-400 font-semibold">{q.skill}</span>
          </div>

          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                 style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }} />
          </div>

          {/* Question Text */}
          <div className="text-lg font-semibold text-white py-2">
            {q.question}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selected[current] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between"
                  style={{
                    background: isSelected ? 'rgba(79, 70, 229, 0.2)' : 'rgba(255, 255, 255, 0.02)',
                    borderColor: isSelected ? '#4F46E5' : 'rgba(255, 255, 255, 0.08)',
                    color: isSelected ? '#ffffff' : '#CBD5E1'
                  }}>
                  <span className="text-sm">{opt}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                    isSelected ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-white/20'
                  }`}>
                    {isSelected && '✓'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <button
              disabled={current === 0}
              onClick={() => setCurrent(current - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold border disabled:opacity-30"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#8A8FAD' }}>
              Previous
            </button>

            {current < QUESTIONS.length - 1 ? (
              <button
                disabled={selected[current] === undefined}
                onClick={() => setCurrent(current + 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white disabled:opacity-30 flex items-center gap-1.5"
                style={{ background: '#4F46E5' }}>
                Next <ArrowRight size={13} />
              </button>
            ) : (
              <button
                disabled={selected[current] === undefined}
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg flex items-center gap-1.5"
                style={{ background: '#10B981', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}>
                Submit Assessment <CheckCircle2 size={14} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl p-8 border text-center space-y-5"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
               style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.35)' }}>
            <Award size={32} className="text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black text-white" style={{ fontFamily: 'Fraunces, serif' }}>
            Assessment Result: {score}%
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: '#8A8FAD' }}>
            Your assessment benchmark has updated your student profile and adjusted your AI career gap roadmap.
          </p>
          <div className="pt-2">
            <button
              onClick={() => { setSubmitted(false); setSelected({}); setCurrent(0); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold border text-white"
              style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <RotateCcw size={14} /> Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
