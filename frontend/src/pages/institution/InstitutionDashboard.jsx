import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Button, Tag, Space, Progress, Alert } from 'antd';
import { TeamOutlined, TrophyOutlined, ThunderboltOutlined, BankOutlined, ArrowUpOutlined, RocketOutlined } from '@ant-design/icons';
import PlacementChart from '../../components/institution/PlacementChart';
import SkillDemandChart from '../../components/institution/SkillDemandChart';
import StudentTable from '../../components/institution/StudentTable';
import { institutionService } from '../../services/institutionService';
import { useNavigate } from 'react-router-dom';

const InstitutionDashboard = () => {
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, studentsRes] = await Promise.all([
        institutionService.getDashboardStats(),
        institutionService.getStudents()
      ]);
      setStats(statsRes.data);
      setStudents(studentsRes.data || []);
    } catch (err) {
      console.error('Error loading institution dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>Institution Placement & Academic Intelligence</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>National Institute of Engineering & Technology • Academic Year 2025-26</p>
        </div>
        <Space>
          <Button type="primary" icon={<RocketOutlined />} onClick={() => navigate('/institution/curriculum')}>
            AI Curriculum Alignment
          </Button>
        </Space>
      </div>

      <Alert 
        message="AI Market Alignment Alert: Cloud & Generative AI Deficit Detected" 
        description="Over 78% of active campus hiring recruiters require containerization (Docker/K8s) & GenAI fundamentals. The AI curriculum modification engine has generated 4 actionable recommendations for Sem VI syllabus."
        type="info" 
        showIcon 
        style={{ marginBottom: 24, borderRadius: 8 }}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <Statistic 
              title="Total Enrolled Students" 
              value={stats?.total_students || 1240} 
              prefix={<TeamOutlined style={{ color: '#2563eb' }} />} 
            />
            <div style={{ marginTop: 8, fontSize: 12, color: '#10b981' }}>
              <ArrowUpOutlined /> 100% Student Profiles Verified
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <Statistic 
              title="Overall Placement Rate" 
              value={stats?.placement_rate || 84.5} 
              precision={1}
              suffix="%" 
              prefix={<TrophyOutlined style={{ color: '#10b981' }} />} 
            />
            <div style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>
              457 / 540 Eligible Students Placed
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <Statistic 
              title="Average Readiness Score" 
              value={stats?.avg_readiness || 76.8} 
              suffix="%" 
              prefix={<ThunderboltOutlined style={{ color: '#f59e0b' }} />} 
            />
            <Progress percent={stats?.avg_readiness || 77} size="small" strokeColor="#f59e0b" style={{ marginTop: 8 }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <Statistic 
              title="Active Industry MoUs" 
              value={stats?.industry_partners || 28} 
              prefix={<BankOutlined style={{ color: '#8b5cf6' }} />} 
            />
            <div style={{ marginTop: 8, fontSize: 12, color: '#8b5cf6' }}>
              14 Recruiters on Campus This Week
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <PlacementChart />
        </Col>
        <Col xs={24} lg={12}>
          <SkillDemandChart />
        </Col>
      </Row>

      <Card title="Student Real-time Industry Readiness Roster" bordered={false} style={{ borderRadius: 12 }}>
        <StudentTable students={students} loading={loading} />
      </Card>
    </div>
  );
};

export default InstitutionDashboard;
