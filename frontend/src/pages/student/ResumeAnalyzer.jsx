import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import WorkflowBanner from '../../components/WorkflowBanner';
import API from '../../services/api';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState({
    ats_score: 84,
    skills: ['Python', 'FastAPI', 'React', 'SQL', 'PostgreSQL', 'Docker', 'Git', 'REST APIs', 'Data Structures'],
    strengths: ['Clear project impact metrics', 'Standard ATS-friendly heading format', 'Strong core programming fundamentals'],
    improvements: ['Add cloud deployment URLs (AWS/GCP)', 'Highlight unit test coverage metrics', 'Include CI/CD pipeline experience'],
    breakdown: {
      keyword_density: 34,
      structure: 27,
      completeness: 15,
      quantification: 8
    }
  });

  const handleUpload = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setAnalyzing(true);
    const form = new FormData();
    form.append('file', f);
    try {
      const res = await API.post('/resume/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data) setResult(res.data);
    } catch (err) {
      console.error('Resume upload error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLoadSample = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch('/Skillora_Demo_Resume.pdf');
      const blob = await response.blob();
      const sampleFile = new File([blob], 'Skillora_Demo_Resume.pdf', { type: 'application/pdf' });
      setFile(sampleFile);
      const form = new FormData();
      form.append('file', sampleFile);
      const res = await API.post('/resume/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data) setResult(res.data);
    } catch (err) {
      console.error('Sample resume test error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <WorkflowBanner currentStep={0} completedSteps={[]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
            AI ATS Resume Parser & Analyzer
          </h1>
          <p className="text-xs" style={{ color: '#8A8FAD' }}>
            Extract industry-standard skills, evaluate keyword density, and compute ATS compliance
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <a
            href="/Skillora_Demo_Resume.pdf"
            download="Skillora_Demo_Resume.pdf"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white border hover:bg-white/10 transition-colors inline-flex items-center gap-1.5"
            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <FileText size={14} className="text-indigo-400" /> Download Sample Resume
          </a>
          <button
            type="button"
            onClick={handleLoadSample}
            disabled={analyzing}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 cursor-pointer inline-flex items-center gap-1.5"
            style={{ background: '#4F46E5', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}>
            <Sparkles size={13} /> {analyzing ? 'Analyzing...' : 'Test with Sample Resume'}
          </button>
        </div>
      </div>

      {/* Upload Box */}
      <div className="rounded-2xl p-8 border-2 border-dashed text-center relative transition-colors hover:border-indigo-500/50"
        style={{ background: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.12)' }}>
        <input 
          type="file" 
          accept=".pdf,.txt,.docx" 
          onChange={handleUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        />
        <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-3"
          style={{ background: 'rgba(79, 70, 229, 0.2)', border: '1px solid rgba(79, 70, 229, 0.35)' }}>
          <UploadCloud size={28} style={{ color: '#A5B4FC' }} />
        </div>
        <div className="text-base font-semibold text-white mb-1">
          {file ? file.name : 'Drop your resume PDF here or click to browse'}
        </div>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          Supports PDF, DOCX, TXT up to 10MB • Evaluated via spaCy & semantic keyword models
        </p>
        {analyzing && (
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-indigo-400">
            <Sparkles size={14} className="animate-spin" /> Running AI Section Extraction & ATS Scoring...
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ATS Score Card */}
          <div className="rounded-2xl p-6 border flex flex-col justify-between"
            style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#8A8FAD' }}>Overall ATS Score</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white" style={{ fontFamily: 'Fraunces, serif' }}>{result.ats_score}</span>
                <span className="text-xl font-bold text-emerald-400">/ 100</span>
              </div>
              <div className="mt-2 text-xs font-medium text-emerald-400 inline-flex items-center gap-1">
                <ShieldCheck size={14} /> High ATS Compatibility
              </div>
            </div>

            <div className="mt-6 space-y-2.5 border-t pt-4" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
              {[
                { label: 'Keyword Density', score: result.breakdown.keyword_density, max: 40 },
                { label: 'Formatting & Layout', score: result.breakdown.structure, max: 30 },
                { label: 'Profile Completeness', score: result.breakdown.completeness, max: 20 },
                { label: 'Impact Metrics', score: result.breakdown.quantification, max: 10 }
              ].map(b => (
                <div key={b.label}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span style={{ color: '#8A8FAD' }}>{b.label}</span>
                    <span className="text-white font-medium">{b.score} / {b.max}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(b.score / b.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extracted Skills */}
          <div className="lg:col-span-2 rounded-2xl p-6 border space-y-5"
            style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <div>
              <div className="font-semibold text-white text-sm mb-3">Extracted Technical Skills ({result.skills.length})</div>
              <div className="flex flex-wrap gap-2">
                {result.skills.map(s => (
                  <span key={s} className="px-3 py-1 rounded-xl text-xs font-medium border"
                    style={{ background: 'rgba(79, 70, 229, 0.15)', borderColor: 'rgba(79, 70, 229, 0.3)', color: '#A5B4FC' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div>
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 size={14} /> Resume Strengths
                </div>
                <ul className="space-y-1.5 text-xs" style={{ color: '#8A8FAD' }}>
                  {result.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-2">
                  <AlertCircle size={14} /> Recommended Improvements
                </div>
                <ul className="space-y-1.5 text-xs" style={{ color: '#8A8FAD' }}>
                  {result.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
