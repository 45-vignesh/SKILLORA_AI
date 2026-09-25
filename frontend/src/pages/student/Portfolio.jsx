import React from 'react';
import { User, Github, Linkedin, ExternalLink, Award, Sparkles, FolderGit2, CheckCircle2 } from 'lucide-react';
import WorkflowBanner from '../../components/WorkflowBanner';

export default function Portfolio() {
  const profile = {
    name: 'Aarav Sharma',
    tagline: 'Aspiring Full Stack & Cloud Developer | B.Tech CSE (Year 3)',
    college: 'NIT Bengaluru',
    cgpa: '8.8 / 10.0',
    bio: 'Passionate about building scalable web applications with FastAPI, React, and cloud containerization. Active contributor to open-source developer tooling and hackathons.',
    skills: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Git', 'Tailwind CSS', 'REST APIs'],
    projects: [
      {
        title: 'SKILLORA AI — Career Collaboration Platform',
        desc: 'Quad-stakeholder platform with semantic vector RAG matching and explainable AI skill gap roadmaps.',
        tech: ['FastAPI', 'React', 'Tailwind CSS', 'TF-IDF RAG'],
        link: 'https://github.com/45-vignesh/SKILLORA_AI'
      },
      {
        title: 'Microservices Auth & Payment Gateway',
        desc: 'Decoupled authentication microservice utilizing JWT, Redis distributed caching, and Stripe webhooks.',
        tech: ['FastAPI', 'Redis', 'PostgreSQL', 'Docker'],
        link: '#'
      }
    ],
    certifications: [
      'Meta Front-End Developer Professional Certificate (Coursera)',
      'AWS Certified Cloud Practitioner (Foundational)'
    ]
  };

  return (
    <div className="space-y-6">
      <WorkflowBanner currentStep={8} completedSteps={[0, 1, 2, 3, 4, 5, 6, 7]} />

      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          Digital Career Portfolio
        </h1>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          Shareable student profile verified through SKILLORA AI assessments
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="rounded-2xl p-6 border relative overflow-hidden"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-18 h-18 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg"
               style={{ background: '#4F46E5', width: 72, height: 72 }}>
            AS
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-white">{profile.name}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Verified Candidate
              </span>
            </div>
            <div className="text-xs text-indigo-400 font-medium mb-1.5">{profile.tagline}</div>
            <div className="text-[11px]" style={{ color: '#8A8FAD' }}>{profile.college} • CGPA {profile.cgpa}</div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a href="https://github.com/45-vignesh/SKILLORA_AI" target="_blank" rel="noreferrer"
               className="p-2.5 rounded-xl border text-white hover:bg-white/10 transition-colors"
               style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <Github size={16} />
            </a>
            <a href="#" className="p-2.5 rounded-xl border text-white hover:bg-white/10 transition-colors"
               style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        <p className="text-xs mt-4 leading-relaxed border-t pt-4" style={{ color: '#8A8FAD', borderColor: 'rgba(255,255,255,0.06)' }}>
          {profile.bio}
        </p>
      </div>

      {/* Skills */}
      <div className="rounded-2xl p-6 border space-y-3"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="text-xs font-semibold uppercase tracking-wider text-white">Verified Skills</div>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map(s => (
            <span key={s} className="px-3 py-1 rounded-xl text-xs font-medium border"
                  style={{ background: 'rgba(79, 70, 229, 0.15)', borderColor: 'rgba(79, 70, 229, 0.3)', color: '#A5B4FC' }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-white">Featured Technical Projects</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.projects.map((proj, idx) => (
            <div key={idx} className="p-5 rounded-2xl border flex flex-col justify-between space-y-3"
                 style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-white text-sm">{proj.title}</h4>
                  <a href={proj.link} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-white">
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#8A8FAD' }}>{proj.desc}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {proj.tech.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-white/80 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="rounded-2xl p-6 border space-y-3"
           style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
        <div className="text-xs font-semibold uppercase tracking-wider text-white">Accredited Certifications</div>
        <div className="space-y-2">
          {profile.certifications.map((c, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl border text-xs"
                 style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <Award size={15} className="text-amber-400 flex-shrink-0" />
              <span className="text-white font-medium">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
