import React from 'react';
import { Card, Tag, Button, Space, Progress } from 'antd';
import { CalendarOutlined, BankOutlined, EnvironmentOutlined, CheckCircleOutlined } from '@ant-design/icons';

const TrainingCard = ({ training, onApply, applied = false }) => {
  return (
    <Card 
      hoverable 
      bordered={false} 
      style={{ borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <Tag color="purple" style={{ margin: 0, fontWeight: 600 }}>{training.category || 'Faculty Upskilling'}</Tag>
          <Tag color={applied ? 'green' : 'blue'}>{applied ? 'Nominated' : 'Open Registration'}</Tag>
        </div>

        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{training.title}</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 13, marginBottom: 12 }}>
          <BankOutlined /> <span style={{ fontWeight: 500 }}>{training.provider || training.company || 'Google Cloud India'}</span>
        </div>

        <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5, margin: '0 0 16px' }}>
          {training.description || 'Comprehensive industrial faculty immersion program covering state-of-the-art architectures, hands-on enterprise labs, and syllabus design.'}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {(training.skills || ['Generative AI', 'Cloud Infra', 'FastAPI']).map((sk, idx) => (
            <Tag key={idx} style={{ margin: 0, fontSize: 11, background: '#f1f5f9', border: 'none' }}>{sk}</Tag>
          ))}
        </div>
      </div>

      <div>
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#64748b', marginBottom: 14 }}>
          <span><CalendarOutlined /> {training.duration || '4 Weeks (Part-time)'}</span>
          <span><EnvironmentOutlined /> {training.mode || 'Hybrid / Virtual'}</span>
        </div>

        <Button 
          type={applied ? 'default' : 'primary'} 
          block 
          disabled={applied} 
          onClick={() => onApply && onApply(training)}
          style={{ 
            borderRadius: 8, 
            height: 38, 
            fontWeight: 600,
            background: applied ? undefined : '#7c3aed',
            borderColor: applied ? undefined : '#7c3aed'
          }}
        >
          {applied ? <><CheckCircleOutlined /> Registered</> : 'Apply for Faculty Sabbatical'}
        </Button>
      </div>
    </Card>
  );
};

export default TrainingCard;
