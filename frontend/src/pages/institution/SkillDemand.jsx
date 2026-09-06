import React from 'react';
import { Row, Col, Card, Table, Tag, Progress, Alert } from 'antd';
import { ThunderboltOutlined, ArrowUpOutlined } from '@ant-design/icons';
import SkillDemandChart from '../../components/institution/SkillDemandChart';

const SkillDemand = () => {
  const demandTrends = [
    { skill: 'Docker & Kubernetes', domain: 'Cloud & DevOps', marketDemand: 95, campusCoverage: 42, gap: -53 },
    { skill: 'Generative AI & LLMs (RAG)', domain: 'Artificial Intelligence', marketDemand: 92, campusCoverage: 38, gap: -54 },
    { skill: 'FastAPI & Microservices', domain: 'Backend Engineering', marketDemand: 86, campusCoverage: 62, gap: -24 },
    { skill: 'React & Modern Frontend', domain: 'Frontend Development', marketDemand: 88, campusCoverage: 84, gap: -4 },
    { skill: 'Cybersecurity & Zero Trust', domain: 'Security', marketDemand: 79, campusCoverage: 35, gap: -44 },
    { skill: 'Data Warehousing & SQL', domain: 'Data Engineering', marketDemand: 84, campusCoverage: 75, gap: -9 },
  ];

  const columns = [
    { title: 'Skill Name', dataIndex: 'skill', key: 'skill', render: text => <b>{text}</b> },
    { title: 'Domain', dataIndex: 'domain', key: 'domain', render: dom => <Tag color="geekblue">{dom}</Tag> },
    { 
      title: 'Industry Demand', 
      dataIndex: 'marketDemand', 
      key: 'marketDemand',
      render: val => <Progress percent={val} size="small" strokeColor="#ef4444" />
    },
    { 
      title: 'Student Proficiency', 
      dataIndex: 'campusCoverage', 
      key: 'campusCoverage',
      render: val => <Progress percent={val} size="small" strokeColor="#3b82f6" />
    },
    { 
      title: 'Deficit Gap', 
      dataIndex: 'gap', 
      key: 'gap',
      render: gap => <Tag color={gap <= -40 ? 'error' : gap <= -20 ? 'warning' : 'success'}>{gap}%</Tag>
    }
  ];

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontWeight: 700 }}>Industry Skill Demand & Market Intelligence</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b' }}>Real-time telemetry gathered from job postings, hiring trends, and industry partner requirements</p>
      </div>

      <Alert 
        message="Action Recommended: Integrate Cloud & Microservices Labs" 
        description="The largest institutional gap is currently in Cloud Infrastructure & Containerization (-53%). Introducing a hands-on Docker/Kubernetes lab will increase average campus placement readiness by an estimated 22%."
        type="warning" 
        showIcon 
        style={{ marginBottom: 24, borderRadius: 8 }}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <SkillDemandChart />
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Skill Gap Discrepancy Matrix" bordered={false} style={{ borderRadius: 12 }}>
            <Table dataSource={demandTrends} columns={columns} pagination={false} rowKey="skill" size="small" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SkillDemand;
