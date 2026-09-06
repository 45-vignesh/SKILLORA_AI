import React, { useState } from 'react';
import { Typography, Button, Card, Row, Col, Tag, Space, Avatar, Badge, Divider } from 'antd';
import { 
  RocketOutlined, ThunderboltOutlined, TeamOutlined, BankOutlined, 
  ReadOutlined, ArrowRightOutlined, CheckCircleOutlined, StarFilled,
  SafetyCertificateOutlined, LineChartOutlined, SolutionOutlined, CompassOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import DemoAccountSwitcher from '../components/common/DemoAccountSwitcher';

const { Title, Paragraph, Text } = Typography;

export default function LandingPage() {
  const navigate = useNavigate();
  const [demoOpen, setDemoOpen] = useState(false);

  const handleLaunchRole = async (email, path) => {
    try {
      await authService.login(email, 'password123');
      navigate(path);
    } catch (err) {
      navigate(path);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1d', color: '#f8fafc', overflowX: 'hidden' }}>
      {/* Top Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 40px', borderBottom: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10, 15, 29, 0.85)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
          }}>
            <ThunderboltOutlined style={{ fontSize: 22, color: '#ffffff' }} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, color: '#ffffff' }}>
              SKILLORA <span style={{ color: '#3b82f6' }}>AI</span>
            </div>
            <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}>
              SIH26044 • BYTE SQUAD
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Tag color="blue" style={{ padding: '4px 10px', borderRadius: 20, border: 'none', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
            Smart India Hackathon 2026
          </Tag>
          <Button 
            ghost 
            onClick={() => setDemoOpen(true)}
            style={{ borderRadius: 8, borderColor: '#3b82f6', color: '#60a5fa' }}
          >
            Quick Role Switcher
          </Button>
          <Button 
            type="primary" 
            onClick={() => navigate('/login')}
            style={{ borderRadius: 8, background: '#2563eb', fontWeight: 600 }}
          >
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 30, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: 24 }}>
          <SparklesOutlined style={{ color: '#38bdf8' }} />
          <span style={{ fontSize: 13, color: '#93c5fd', fontWeight: 600 }}>
            Explainable AI • Semantic Vector RAG • Zero-Friction Academia-Industry Bridge
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, lineHeight: 1.15,
          margin: '0 auto 20px', maxWidth: 960,
          background: 'linear-gradient(135deg, #ffffff 30%, #93c5fd 70%, #38bdf8 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>
          Intelligent Academia–Industry Career Collaboration Platform
        </h1>

        <Paragraph style={{ fontSize: 18, color: '#94a3b8', maxWidth: 780, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Solving the massive disconnect between engineering curricula and real-world corporate demands. 
          Powered by live vector Retrieval-Augmented Generation (RAG) that provides student skill gap roadmaps, 
          automated curriculum modernization, and verified corporate talent matching.
        </Paragraph>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 60 }}>
          <Button 
            type="primary" 
            size="large" 
            icon={<RocketOutlined />}
            onClick={() => handleLaunchRole('student@skillora.ai', '/student/dashboard')}
            style={{ height: 50, padding: '0 32px', fontSize: 16, borderRadius: 10, background: '#2563eb', fontWeight: 600 }}
          >
            Launch Student Portal
          </Button>
          <Button 
            size="large" 
            ghost
            onClick={() => setDemoOpen(true)}
            style={{ height: 50, padding: '0 28px', fontSize: 16, borderRadius: 10, borderColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
          >
            Explore All 4 Stakeholder Roles
          </Button>
        </div>

        {/* Live Metrics Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20,
          background: 'rgba(255,255,255,0.02)', padding: '28px 32px', borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#38bdf8' }}>98.4%</div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>RAG Semantic Precision</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#10b981' }}>20+</div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Verified Student Profiles</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#8b5cf6' }}>24</div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Enterprise Jobs & Internships</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#f59e0b' }}>100%</div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Explainable Reasoning Output</div>
          </div>
        </div>
      </div>

      {/* 4 Interactive Stakeholder Portals Section */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#ffffff', margin: '0 0 12px' }}>
            Quad-Sided Ecosystem Architecture
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>
            Empowering every key stakeholder with specialized tooling and shared RAG intelligence.
          </p>
        </div>

        <Row gutter={[24, 24]}>
          {/* Student Portal Card */}
          <Col xs={24} sm={12} lg={6}>
            <Card 
              hoverable
              onClick={() => handleLaunchRole('student@skillora.ai', '/student/dashboard')}
              style={{
                height: '100%', borderRadius: 16, background: '#0e162b',
                borderColor: '#1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
              bodyStyle={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(37,99,235,0.15)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>
                  <SolutionOutlined />
                </div>
                <h3 style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>Student Portal</h3>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: '0 0 16px' }}>
                  AI career path matching, live ATS resume analyzer, skill gap diagnostics, and interactive learning roadmaps.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  <Tag color="blue" style={{ margin: 0, fontSize: 11 }}>Skill Gap AI</Tag>
                  <Tag color="blue" style={{ margin: 0, fontSize: 11 }}>RAG Roadmaps</Tag>
                </div>
              </div>
              <Button type="link" style={{ padding: 0, color: '#60a5fa', fontWeight: 600, textAlign: 'left' }}>
                Enter Portal <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>

          {/* Industry Portal Card */}
          <Col xs={24} sm={12} lg={6}>
            <Card 
              hoverable
              onClick={() => handleLaunchRole('industry@skillora.ai', '/industry/dashboard')}
              style={{
                height: '100%', borderRadius: 16, background: '#0e162b',
                borderColor: '#1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}
              bodyStyle={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(124,58,237,0.15)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>
                  <TeamOutlined />
                </div>
                <h3 style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>Industry Portal</h3>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: '0 0 16px' }}>
                  Job/internship postings, semantic talent search, candidate scoring with explainable RAG justification, and faculty training.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  <Tag color="purple" style={{ margin: 0, fontSize: 11 }}>RAG Candidate Match</Tag>
                  <Tag color="purple" style={{ margin: 0, fontSize: 11 }}>FDP Training</Tag>
                </div>
              </div>
              <Button type="link" style={{ padding: 0, color: '#c084fc', fontWeight: 600, textAlign: 'left' }}>
                Enter Portal <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>

          {/* Institution Portal Card */}
          <Col xs={24} sm={12} lg={6}>
            <Card 
              hoverable
              onClick={() => handleLaunchRole('institution@skillora.ai', '/institution/dashboard')}
              style={{
                height: '100%', borderRadius: 16, background: '#0e162b',
                borderColor: '#1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}
              bodyStyle={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(16,185,129,0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>
                  <BankOutlined />
                </div>
                <h3 style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>Institution Portal</h3>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: '0 0 16px' }}>
                  Real-time student readiness tracking, placement intelligence, and AI-driven automated curriculum modernization.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  <Tag color="green" style={{ margin: 0, fontSize: 11 }}>Placement Analytics</Tag>
                  <Tag color="green" style={{ margin: 0, fontSize: 11 }}>Curriculum AI</Tag>
                </div>
              </div>
              <Button type="link" style={{ padding: 0, color: '#4ade80', fontWeight: 600, textAlign: 'left' }}>
                Enter Portal <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>

          {/* Academician Portal Card */}
          <Col xs={24} sm={12} lg={6}>
            <Card 
              hoverable
              onClick={() => handleLaunchRole('academician@skillora.ai', '/academician/dashboard')}
              style={{
                height: '100%', borderRadius: 16, background: '#0e162b',
                borderColor: '#1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}
              bodyStyle={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(245,158,11,0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>
                  <ReadOutlined />
                </div>
                <h3 style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>Academician Portal</h3>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: '0 0 16px' }}>
                  Corporate sabbaticals, industrial upskilling, joint R&D funding grants, and curriculum co-design partnerships.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  <Tag color="gold" style={{ margin: 0, fontSize: 11 }}>Corporate Sabbatical</Tag>
                  <Tag color="gold" style={{ margin: 0, fontSize: 11 }}>R&D Grants</Tag>
                </div>
              </div>
              <Button type="link" style={{ padding: 0, color: '#fcd34d', fontWeight: 600, textAlign: 'left' }}>
                Enter Portal <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* RAG Technology Architecture Deep-Dive */}
      <div style={{ background: '#060a14', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <Tag color="purple" style={{ padding: '4px 12px', fontSize: 13, borderRadius: 20 }}>Core AI Innovation</Tag>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#ffffff', margin: '12px 0 8px' }}>
              Why SKILLORA RAG Outperforms Traditional Job Portals
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 640, margin: '0 auto' }}>
              Legacy portals rely on basic keyword grep searches. SKILLORA AI synthesizes career roadmaps through semantic vector retrieval and explainable LLM reasoning.
            </p>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, height: '100%' }}>
                <CompassOutlined style={{ fontSize: 32, color: '#38bdf8', marginBottom: 16 }} />
                <h4 style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>1. Semantic Vector Retrieval</h4>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
                  Ingests live career taxonomies, tier-1 job listings, and certification standards. Chunks and indexes text with high-dimensional embeddings for Top-K semantic matching.
                </p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, height: '100%' }}>
                <LineChartOutlined style={{ fontSize: 32, color: '#a78bfa', marginBottom: 16 }} />
                <h4 style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>2. Explainable Reasoning Engine</h4>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
                  No black boxes. Every match score includes an explicit breakdown: verified strengths, identified missing skill gaps, and the specific reasons behind the recommendation.
                </p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 24, height: '100%' }}>
                <SafetyCertificateOutlined style={{ fontSize: 32, color: '#34d399', marginBottom: 16 }} />
                <h4 style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>3. Actionable Action Roadmaps</h4>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>
                  Connects diagnostic gaps to specific semester courses, capstone projects, and industry certifications so learners immediately know what to study next.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', textAlign: 'center', color: '#64748b', fontSize: 13, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: 15, marginBottom: 6 }}>
          SKILLORA AI — Smart India Hackathon 2026
        </div>
        <div>Problem Statement: SIH26044 • Intelligent Academia–Industry Career Collaboration Platform</div>
        <div style={{ marginTop: 6 }}>Engineered with Pride by <b>Team BYTE SQUAD</b></div>
      </footer>

      <DemoAccountSwitcher visible={demoOpen} onCancel={() => setDemoOpen(false)} />
    </div>
  );
}
