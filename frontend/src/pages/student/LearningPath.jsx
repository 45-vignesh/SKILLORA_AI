import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Circle, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import WorkflowBanner from '../../components/WorkflowBanner';

const PHASES = [
  {
    phase: 1,
    title: 'Foundations & Microservices Core',
    desc: 'Master async FastAPI patterns, SQLAlchemy relationship models, and PostgreSQL migrations',
    duration: '2 Weeks',
    progress: 100,
    tasks: [
      { name: 'FastAPI async route handlers & Dependency Injection', done: true },
      { name: 'SQLAlchemy declarative models & migrations', done: true },
      { name: 'JWT security tokens & password hashing', done: true }
    ]
  },
  {
    phase: 2,
    title: 'Modern Reactive Frontend Architecture',
    desc: 'Build scalable state-managed dashboards with React 18, Tailwind CSS, and Recharts',
    duration: '2 Weeks',
    progress: 80,
    tasks: [
      { name: 'React 18 Concurrent features & hooks architecture', done: true },
      { name: 'Tailwind CSS v4 design system implementation', done: true },
      { name: 'Recharts interactive telemetry data visualizers', done: false }
    ]
  },
  {
    phase: 3,
    title: 'Cloud Containerization & CI/CD Pipelines',
    desc: 'Containerize multi-service applications using Docker Compose and automate deployments',
    duration: '3 Weeks',
    progress: 35,
    tasks: [
      { name: 'Multi-stage Docker builds for Python & Node', done: true },
      { name: 'Docker Compose networking & volumes orchestration', done: false },
      { name: 'GitHub Actions continuous integration pipeline', done: false }
    ]
  },
  {
    phase: 4,
    title: 'Retrieval-Augmented Generation (RAG) & Vector Search',
    desc: 'Implement vector semantic embeddings with FAISS and explainable LLM reasoning',
    duration: '3 Weeks',
    progress: 20,
    tasks: [
      { name: 'Text chunking & TF-IDF / sentence-transformer vectors', done: true },
      { name: 'FAISS similarity search & Top-K retrieval', done: false },
      { name: 'Explainable LLM grounding & diagnostic outputs', done: false }
    ]
  }
];

export default function LearningPath() {
  const [phases, setPhases] = useState(PHASES);

  const toggleTask = (pIdx, tIdx) => {
    const updated = [...phases];
    updated[pIdx].tasks[tIdx].done = !updated[pIdx].tasks[tIdx].done;
    const completed = updated[pIdx].tasks.filter(t => t.done).length;
    updated[pIdx].progress = Math.round((completed / updated[pIdx].tasks.length) * 100);
    setPhases(updated);
  };

  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const doneTasks = phases.reduce((acc, p) => acc + p.tasks.filter(t => t.done).length, 0);
  const overall = Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      <WorkflowBanner currentStep={5} completedSteps={[0, 1, 2, 3, 4]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
            Personalized AI Learning Roadmap
          </h1>
          <p className="text-xs" style={{ color: '#8A8FAD' }}>
            Curated 4-phase curriculum tailored to bridge your specific technical gaps
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl border"
             style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <Trophy size={18} className="text-amber-400" />
          <div>
            <div className="text-[10px] uppercase font-bold" style={{ color: '#8A8FAD' }}>Overall Progress</div>
            <div className="text-sm font-bold text-white">{overall}% Completed</div>
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {phases.map((p, pIdx) => (
          <div key={p.phase} className="p-6 rounded-2xl border space-y-4"
               style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3"
                 style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                    {p.phase}
                  </span>
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                </div>
                <p className="text-xs mt-1" style={{ color: '#8A8FAD' }}>{p.desc} • Duration: {p.duration}</p>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-indigo-400">{p.progress}%</span>
              </div>
            </div>

            {/* Tasks list */}
            <div className="space-y-2">
              {p.tasks.map((t, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => toggleTask(pIdx, tIdx)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors hover:bg-white/5"
                  style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                  {t.done ? (
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Circle size={16} className="text-white/30 flex-shrink-0" />
                  )}
                  <span className={`text-xs font-medium ${t.done ? 'line-through text-white/40' : 'text-white'}`}>
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
