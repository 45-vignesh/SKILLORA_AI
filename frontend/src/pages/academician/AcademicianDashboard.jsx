import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Button, Tag, Space, Alert, Progress } from 'antd';
import { ReadOutlined, ExperimentOutlined, TrophyOutlined, TeamOutlined, PlusOutlined, RocketOutlined } from '@ant-design/icons';
import TrainingCard from '../../components/academician/TrainingCard';
import ResearchCard from '../../components/academician/ResearchCard';
import { academicianService } from '../../services/academicianService';
import { useNavigate } from 'react-router-dom';

const AcademicianDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [researchProjects, setResearchProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [trainRes, resRes] = await Promise.all([
        academicianService.getTrainings(),
        academicianService.getResearchProjects()
      ]);
      setTrainings(trainRes.data || []);
      setResearchProjects(resRes.data || []);
    } catch (err) {
      console.error('Error fetching academician dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700 }}>Faculty Industrial Empowerment Dashboard</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>Welcome back, Dr. Rajesh Sharma • Professor of Computer Science</p>
        </div>
        <Space>
          <Button type="primary" icon={<RocketOutlined />} onClick={() => navigate('/academician/opportunities')} style={{ background: '#7c3aed', borderColor: '#7c3aed' }}>
            Explore Corporate Fellowships
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Enrolled FDPs" value={3} prefix={<ReadOutlined style={{ color: '#7c3aed' }} />} />
            <div style={{ fontSize: 12, color: '#10b981', marginTop: 4 }}>2 Completed, 1 Ongoing</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Active Research Grants" value="₹ 28.5 L" prefix={<ExperimentOutlined style={{ color: '#2563eb' }} />} />
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Sponsored by Infosys & Intel</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Joint Patents / Papers" value={8} prefix={<TrophyOutlined style={{ color: '#f59e0b' }} />} />
            <div style={{ fontSize: 12, color: '#f59e0b', marginTop: 4 }}>4 Indexed in Scopus Q1</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 12 }}>
            <Statistic title="Industry Mentor Rating" value="4.9 / 5.0" prefix={<TeamOutlined style={{ color: '#10b981' }} />} />
            <div style={{ fontSize: 12, color: '#10b981', marginTop: 4 }}>Top 5% Faculty Mentors</div>
          </Card>
        </Col>
      </Row>

      <Alert 
        message="Corporate Sabbatical Application Open" 
        description="Google Cloud Academic Research Sabbatical program has opened nominations for AI & Systems faculty. Funding up to $25,000 in GCP compute credits included."
        type="info" 
        showIcon 
        style={{ marginBottom: 24, borderRadius: 8 }}
      />

      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontWeight: 700 }}>Featured Industry Faculty Training Programs</h3>
          <Button type="link" onClick={() => navigate('/academician/training')}>View All Programs</Button>
        </div>
        <Row gutter={[16, 16]}>
          {trainings.slice(0, 3).map((item, idx) => (
            <Col xs={24} md={8} key={item.id || idx}>
              <TrainingCard training={item} applied={idx === 0} />
            </Col>
          ))}
        </Row>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontWeight: 700 }}>Active Joint Industry R&D Projects</h3>
          <Button type="link" onClick={() => navigate('/academician/research')}>View All Grants</Button>
        </div>
        <Row gutter={[16, 16]}>
          {researchProjects.slice(0, 3).map((item, idx) => (
            <Col xs={24} md={8} key={item.id || idx}>
              <ResearchCard project={item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AcademicianDashboard;
