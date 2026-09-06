import React from 'react';
import { Card, Tag, Button, Typography, Space } from 'antd';
import { DollarOutlined, SolutionOutlined, TeamOutlined, SendOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ResearchCard = ({ project, onCollaborate }) => {
  return (
    <Card 
      hoverable 
      bordered={false} 
      style={{ borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <Tag color="cyan" style={{ margin: 0 }}>{project.domain || 'Applied AI & Robotics'}</Tag>
          <Tag color="gold" style={{ margin: 0 }}>Grant: {project.grant_amount || '₹ 15,00,000'}</Tag>
        </div>

        <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{project.title}</h3>
        <div style={{ fontSize: 13, color: '#2563eb', fontWeight: 500, marginBottom: 10 }}>
          Lead Sponsor: {project.sponsor || 'Tata Elxsi Innovation Labs'}
        </div>

        <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5, margin: '0 0 14px' }}>
          {project.description || 'Joint research exploration into edge-computing computer vision models for autonomous automotive obstacle detection.'}
        </p>

        <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: 8, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: '#64748b' }}>Faculty Deliverables:</div>
          <div style={{ fontSize: 12, color: '#334155', fontWeight: 500 }}>{project.deliverable || 'Joint IEEE Research Publication + Patent Filing'}</div>
        </div>
      </div>

      <div>
        <Button 
          type="primary" 
          ghost 
          block 
          icon={<SendOutlined />}
          onClick={() => onCollaborate && onCollaborate(project)}
          style={{ borderRadius: 8, height: 38, fontWeight: 600 }}
        >
          Submit Research Proposal
        </Button>
      </div>
    </Card>
  );
};

export default ResearchCard;
