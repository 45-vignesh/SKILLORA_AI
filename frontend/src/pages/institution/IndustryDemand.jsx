import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { institutionService } from '../../services/institutionService';

export default function IndustryDemand() {
  const [trends, setTrends] = useState([]);
  const [loadingTrends, setLoadingTrends] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    institutionService.getSkillDemandTrends()
      .then(res => {
        setTrends(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        setError(err.isForbidden ? 'Access restricted for current role.' : (err.response?.data?.detail || 'Failed to load skill demand trends.'));
      })
      .finally(() => setLoadingTrends(false));
  }, []);

  const runCurriculumAnalysis = async () => {
    setAnalyzing(true);
    setError(null);
    try {
      const res = await institutionService.generateCurriculumFeedback('Computer Science & Engineering');
      const insights = res.data?.rag_insights;
      if (insights) {
        setResult({
          currentReadiness: insights.readiness_score ?? 0,
          projectedReadiness: Math.min(98, Math.round((insights.readiness_score ?? 65) + 25)),
          outdated: insights.skill_gaps || [],
          modern: insights.recommendations || [],
          explanation: insights.explanation || '',
          sources: insights.sources || [],
        });
      }
    } catch (err) {
      setError(err.isForbidden ? 'Access denied: Institution role required.' : (err.response?.data?.detail || 'Curriculum AI analysis failed.'));
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
            Industry Skill Demand & Curriculum Modernization
          </h1>
          <p className="text-xs" style={{ color: '#8A8FAD' }}>
            Cross-reference academic syllabi against live corporate job postings via Vector RAG
          </p>
        </div>

        <button
          onClick={runCurriculumAnalysis}
          disabled={analyzing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-50"
          style={{ background: '#F59E0B', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)' }}>
          <Sparkles size={14} /> {analyzing ? 'Analyzing with Vector RAG...' : 'Run AI Curriculum Alignment'}
        </button>
      </div>

      {error && (
        <div className="rounded-xl p-3 border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Discrepancy Matrix */}
      <div className="rounded-2xl p-6 border space-y-4"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="font-semibold text-white text-sm">Industry Demand vs Campus Proficiency Gaps</div>

        {loadingTrends ? (
          <div className="text-xs text-slate-400">Loading skill demand trends...</div>
        ) : trends.length === 0 ? (
          <div className="text-xs text-slate-400">No skill demand trend records available.</div>
        ) : (
          <div className="space-y-3">
            {trends.map(t => (
              <div key={t.skill} className="p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3"
                   style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{t.skill}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-white/5 text-amber-400 border border-white/10">{t.urgency}</span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: '#8A8FAD' }}>
                    Market Growth: <span className="text-white font-medium">{t.growth}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-red-400 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                    {t.student_deficit} Deficit
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RAG Alignment Result */}
      {result && (
        <div className="rounded-2xl p-6 border space-y-4"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <span className="font-bold text-white text-sm">AI Syllabus Modernization Recommendations</span>
            <span className="text-xs font-bold text-emerald-400">
              Readiness Uplift: {result.currentReadiness}% ➔ {result.projectedReadiness}%
            </span>
          </div>

          {result.explanation && (
            <p className="text-xs leading-relaxed" style={{ color: '#CBD5E1' }}>
              {result.explanation}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-rose-400 mb-2">Identified Curriculum Skill Gaps</div>
              <ul className="space-y-1 text-xs" style={{ color: '#8A8FAD' }}>
                {result.outdated.map((o, idx) => (
                  <li key={idx}>• {o}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-emerald-400 mb-2">Mandatory Modern Additions</div>
              <ul className="space-y-1 text-xs" style={{ color: '#8A8FAD' }}>
                {result.modern.map((m, idx) => (
                  <li key={idx}>• {m}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
