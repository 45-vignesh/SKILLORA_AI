import React, { useState, useEffect } from 'react';
import { Card, Select, Button, Typography, message, Spin, Row, Col } from 'antd';
import { Box } from '@mui/material';
import { Sparkles, Compass } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import RAGExplanationCard from '../../components/common/RAGExplanationCard';
import { studentService } from '../../services/studentService';
import { aiService } from '../../services/aiService';

export default function SkillGap() {
  const [profile, setProfile] = useState(null);
  const [targetRole, setTargetRole] = useState('Cloud Engineer');
  const [ragResult, setRagResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const roles = [
    'Cloud Engineer',
    'Full Stack Developer',
    'AI/ML Engineer',
    'DevOps Engineer',
    'Cybersecurity Analyst',
    'Data Scientist',
    'Backend Engineer',
    'Frontend Engineer',
    'Data Engineer',
    'QA Automation Engineer'
  ];

  const loadProfile = async () => {
    try {
      const res = await studentService.getProfile();
      setProfile(res.data);
      if (res.data.target_role) {
        setTargetRole(res.data.target_role);
      }
      runGapAnalysis(res.data.target_role || 'Cloud Engineer', res.data.skills?.map(s => s.name) || ['Python', 'Linux', 'Networking']);
    } catch (err) {
      console.error(err);
    }
  };

  const runGapAnalysis = async (role, skills) => {
    setLoading(true);
    try {
      const sList = skills || profile?.skills?.map(s => s.name) || ['Python', 'Linux', 'Networking'];
      const res = await aiService.analyzeSkillGap(sList, role);
      setRagResult(res.data);
    } catch (err) {
      message.error('RAG Gap Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Explainable Skill Gap Analysis
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Compare your verified skills against live industry competency frameworks retrieved from our vector knowledge base.
      </Typography.Paragraph>

      <Card style={{ borderRadius: 12, marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={16}>
            <Typography.Text strong style={{ display: 'block', marginBottom: 6 }}>
              Select Target Career Role for RAG Benchmarking:
            </Typography.Text>
            <Select
              value={targetRole}
              onChange={(val) => {
                setTargetRole(val);
                runGapAnalysis(val);
              }}
              style={{ width: '100%' }}
              size="large"
            >
              {roles.map((r) => (
                <Select.Option key={r} value={r}>{r}</Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={8} style={{ textAlign: 'right', marginTop: 12 }}>
            <Button
              type="primary"
              size="large"
              icon={<Sparkles size={16} />}
              loading={loading}
              onClick={() => runGapAnalysis(targetRole)}
              style={{ borderRadius: 8 }}
            >
              Re-Analyze Gaps
            </Button>
          </Col>
        </Row>
      </Card>

      {loading ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Spin size="large" tip="Retrieving industry framework and synthesizing gaps..." />
        </Box>
      ) : (
        <RAGExplanationCard aiData={ragResult} targetTitle={targetRole} />
      )}
    </UnifiedLayout>
  );
}
