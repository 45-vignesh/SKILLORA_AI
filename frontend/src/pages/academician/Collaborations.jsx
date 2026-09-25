import React from 'react';
import { Handshake, Users, Video, Calendar, Star } from 'lucide-react';

const MENTORS = [
  { name: 'Dr. Anand Raman', role: 'Chief AI Architect at NVIDIA', sessions: 12, rating: 4.9, topic: 'Distributed Training & TensorRT' },
  { name: 'Priya Sundaram', role: 'Staff Security Engineer at Google', sessions: 8, rating: 4.8, topic: 'Zero Trust & Cloud IAM Architecture' },
  { name: 'Vikram Joshi', role: 'VP of Engineering at Razorpay', sessions: 15, rating: 5.0, topic: 'High-Concurrency FinTech APIs' }
];

export default function Collaborations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Fraunces, serif' }}>
          Industry Mentors & Guest Lecture Exchange
        </h1>
        <p className="text-xs" style={{ color: '#8A8FAD' }}>
          Invite corporate domain experts to co-deliver curriculum sessions and capstone project reviews
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MENTORS.map((m, idx) => (
          <div key={idx} className="rounded-2xl p-5 border flex flex-col justify-between space-y-4"
               style={{ background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3 shadow"
                   style={{ background: '#10B981' }}>
                {m.name.charAt(0)}
              </div>
              <h3 className="font-bold text-white text-sm">{m.name}</h3>
              <div className="text-xs" style={{ color: '#8A8FAD' }}>{m.role}</div>
              
              <div className="text-xs text-emerald-400 font-medium mt-3 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                Focus: {m.topic}
              </div>
            </div>

            <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <span className="text-amber-400 font-medium">⭐ {m.rating} Rating</span>
              <button className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors">
                Invite Lecture
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
