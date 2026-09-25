import React from 'react';
import { Compass, TrendingUp, DollarSign, CheckCircle2, XCircle, ArrowRight, Building2, Sparkles } from 'lucide-react';
import WorkflowBanner from '../../components/WorkflowBanner';

const RECOMMENDATIONS = [
  {
    role: 'Full Stack Web Developer',
    match: 86,
    salary: '₹ 8.5 – 14 LPA',
    demand: 'Very High (+28% YoY)',
    matching: ['React', 'FastAPI', 'PostgreSQL', 'RESTful APIs', 'Git'],
    missing: ['Docker containerization', 'Kubernetes basics', 'CI/CD pipeline triggers'],
    companies: ['Zoho', 'Infosys Springboard', 'Freshworks', 'Swiggy']
  },
  {
    role: 'Backend Microservices Engineer',
    match: 78,
    salary: '₹ 9.0 – 16 LPA',
    demand: 'High (+22% YoY)',
    matching: ['Python', 'SQL & Database Schemas', 'API Authentication', 'Data Structures'],
    missing: ['Redis Caching', 'Kafka / RabbitMQ Message Queues', 'Docker'],
    companies: ['Tata Elxsi', 'Razorpay', 'PhonePe', 'Jio Platforms']
  },
  {
    role: 'AI / Data Solutions Engineer',
    match: 68,
    salary: '₹ 10.0 – 18 LPA',
    demand: 'Extremely High (+45% YoY)',
    matching: ['Python', 'scikit-learn', 'NumPy & Pandas', 'Data Modeling'],
    missing: ['PyTorch / TensorFlow Deep Learning', 'Vector DBs (FAISS)', 'RAG Pipelines'],
    companies: ['NVIDIA', 'Tata Elxsi AI Labs', 'Fractal Analytics', 'Microsoft India']
  }
];

export default function CareerRec() {
  return (
    <div className="space-y-6">
      <WorkflowBanner currentStep={4} completedSteps={[0, 1, 2, 3]} />

      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          AI Career Role Recommendations
        </h1>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          Roles matched via content similarity, collaborative filtering, and market hiring velocity
        </p>
      </div>

      <div className="space-y-4">
        {RECOMMENDATIONS.map((rec, idx) => (
          <div key={rec.role} className="rounded-2xl p-6 border space-y-4 transition-all duration-200 hover:border-white/20"
               style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4"
                 style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-white">{rec.role}</span>
                  {idx === 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                      <Sparkles size={10} /> Top Match
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs" style={{ color: '#8A8FAD' }}>
                  <span className="flex items-center gap-1"><DollarSign size={13} style={{ color: '#10B981' }} /> {rec.salary}</span>
                  <span className="flex items-center gap-1"><TrendingUp size={13} style={{ color: '#0EA5E9' }} /> {rec.demand}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-black text-white" style={{ fontFamily: 'Fraunces, serif' }}>{rec.match}%</div>
                  <div className="text-[10px]" style={{ color: '#8A8FAD' }}>Profile Match</div>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow"
                        style={{ background: '#4F46E5' }}>
                  View Roadmap <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Skills Alignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 size={13} /> Verified Matching Skills ({rec.matching.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {rec.matching.map(s => (
                    <span key={s} className="px-2.5 py-0.5 rounded-lg text-xs font-medium border"
                          style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.25)', color: '#6EE7B7' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-2">
                  <XCircle size={13} /> Skills to Acquire ({rec.missing.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {rec.missing.map(s => (
                    <span key={s} className="px-2.5 py-0.5 rounded-lg text-xs font-medium border"
                          style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.25)', color: '#FCD34D' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Recruiters */}
            <div className="pt-3 border-t flex items-center gap-2 text-xs" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span className="font-medium" style={{ color: '#8A8FAD' }}>Top Companies Hiring:</span>
              <div className="flex flex-wrap gap-2">
                {rec.companies.map(c => (
                  <span key={c} className="text-white font-medium bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
