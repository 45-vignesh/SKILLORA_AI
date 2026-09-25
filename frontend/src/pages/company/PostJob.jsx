import React, { useState } from 'react';
import { Briefcase, Plus, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PostJob() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    title: '',
    type: 'Full-time',
    department: 'Engineering',
    location: '',
    min_salary: '',
    max_salary: '',
    skills: 'React, FastAPI, PostgreSQL, Docker',
    description: '',
    requirements: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          Create New Job / Internship Listing
        </h1>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          AI semantic vector matching will automatically rank eligible student candidates upon publishing
        </p>
      </div>

      {!success ? (
        <form onSubmit={handleSubmit} className="rounded-2xl p-6 border space-y-6"
              style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          {/* Step 1: Basics */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400">1. Position Overview</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8FAD' }}>Job Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Associate Full Stack Developer" 
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border transition-all"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8FAD' }}>Employment Type</label>
                <select 
                  value={form.type}
                  onChange={e => setForm({...form, type: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border transition-all"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <option value="Full-time" className="bg-[#0F1020]">Full-time</option>
                  <option value="Internship" className="bg-[#0F1020]">Internship</option>
                  <option value="Part-time" className="bg-[#0F1020]">Part-time</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8FAD' }}>Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Bengaluru / Hybrid" 
                  value={form.location}
                  onChange={e => setForm({...form, location: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border transition-all"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8FAD' }}>Compensation (Annual CTC / Stipend)</label>
                <input 
                  type="text" 
                  placeholder="e.g. ₹ 8.5 – 12 LPA" 
                  value={form.min_salary}
                  onChange={e => setForm({...form, min_salary: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border transition-all"
                  style={{ background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                />
              </div>
            </div>
          </div>

          {/* Step 2: Technical Skills */}
          <div className="space-y-4 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400">2. Technical Skill Requisites (AI Vector Matching)</div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8FAD' }}>Required Skills (comma separated)</label>
              <input 
                type="text" 
                value={form.skills}
                onChange={e => setForm({...form, skills: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border transition-all"
                style={{ background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#8A8FAD' }}>Job Description & Core Responsibilities</label>
              <textarea 
                rows={4}
                placeholder="Describe candidate responsibilities, engineering expectations, and growth opportunities..."
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border transition-all resize-none"
                style={{ background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <button 
              type="button" 
              onClick={() => navigate('/company/dashboard')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold border text-white hover:bg-white/5"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
              style={{ background: '#0EA5E9', boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)' }}>
              Publish Listing & Run AI Match
            </button>
          </div>
        </form>
      ) : (
        <div className="rounded-2xl p-8 border text-center space-y-4"
             style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Fraunces, serif' }}>Opportunity Published Successfully</h2>
          <p className="text-xs max-w-md mx-auto" style={{ color: '#8A8FAD' }}>
            The AI vector matching pipeline is indexing your requirements and pairing verified candidates.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button onClick={() => navigate('/company/dashboard')} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-sky-500">
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
