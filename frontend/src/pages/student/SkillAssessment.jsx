import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Award, ArrowRight, RotateCcw } from 'lucide-react';
import WorkflowBanner from '../../components/WorkflowBanner';
import { studentService } from '../../services/studentService';

export default function SkillAssessment() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [ragFeedback, setRagFeedback] = useState(null);

  useEffect(() => {
    studentService.getAssessmentQuestions('All')
      .then(res => {
        const list = Array.isArray(res.data) ? res.data : [];
        setQuestions(list);
      })
      .catch(err => {
        setError(err.response?.data?.detail || 'Failed to load assessment questions from server.');
      })
      .finally(() => setLoading(false));
  }, []);

  const q = questions[current];

  const handleSelect = (idx) => {
    if (!q) return;
    setSelected({ ...selected, [q.id]: idx });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await studentService.submitAssessment({
        title: 'Adaptive Technical Skill Assessment',
        category: q?.category || 'Technical Skills',
        answers: selected,
      });
      setScore(res.data?.percentage ?? 0);
      setRagFeedback(res.data?.rag_feedback || null);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit assessment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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

      {error && (
        <div className="rounded-xl p-3 border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl p-8 border text-center text-sm text-slate-300"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          Loading assessment questions...
        </div>
      ) : questions.length === 0 ? (
        <div className="rounded-2xl p-8 border text-center text-sm text-slate-300"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          No assessment questions available at this time.
        </div>
      ) : !submitted ? (
        <div className="rounded-2xl p-6 border space-y-6"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          {/* Question Step Indicator */}
          <div className="flex items-center justify-between text-xs" style={{ color: '#8A8FAD' }}>
            <span>Question {current + 1} of {questions.length}</span>
            <span className="text-indigo-400 font-semibold">{q.skill_tested}</span>
          </div>

          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                 style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>

          {/* Question Text */}
          <div className="text-lg font-semibold text-white py-2">
            {q.question_text}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {(q.options || []).map((opt, idx) => {
              const isSelected = selected[q.id] === idx;
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

            {current < questions.length - 1 ? (
              <button
                disabled={selected[q.id] === undefined}
                onClick={() => setCurrent(current + 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white disabled:opacity-30 flex items-center gap-1.5"
                style={{ background: '#4F46E5' }}>
                Next <ArrowRight size={13} />
              </button>
            ) : (
              <button
                disabled={selected[q.id] === undefined || submitting}
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg flex items-center gap-1.5 disabled:opacity-50"
                style={{ background: '#10B981', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}>
                {submitting ? 'Submitting...' : 'Submit Assessment'} <CheckCircle2 size={14} />
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
            {ragFeedback?.explanation || 'Your assessment benchmark has updated your student profile and adjusted your AI career gap roadmap.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => { setSubmitted(false); setSelected({}); setCurrent(0); setRagFeedback(null); }}
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
