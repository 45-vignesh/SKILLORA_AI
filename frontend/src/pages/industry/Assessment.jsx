import React from 'react';
import { Typography, Card, Button, List, Tag } from 'antd';
import { CheckSquare, Plus } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';

export default function Assessment() {
  const tests = [
    { title: 'Cloud VPC & Terraform IaC Practical Lab', duration: '60 Mins', questions: 20, candidates: 18, benchmark: '75%' },
    { title: 'Full Stack React & API Concurrency Assessment', duration: '45 Mins', questions: 15, candidates: 24, benchmark: '70%' },
    { title: 'AI/ML Vector Pipeline & RAG Test', duration: '60 Mins', questions: 25, candidates: 12, benchmark: '80%' }
  ];

  return (
    <UnifiedLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <Typography.Title level={3} style={{ color: '#1e3a8a', margin: 0 }}>
            Industry Skill Assessments & Coding Tests
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
            Create customized evaluation tests for candidates applying to your enterprise roles.
          </Typography.Paragraph>
        </div>
        <Button type="primary" icon={<Plus size={16} />} style={{ borderRadius: 8 }}>
          Create Custom Assessment
        </Button>
      </div>

      <List
        dataSource={tests}
        renderItem={(item) => (
          <Card style={{ borderRadius: 12, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Typography.Title level={5} style={{ color: '#1e3a8a', margin: '0 0 4px' }}>
                  {item.title}
                </Typography.Title>
                <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                  Duration: {item.duration} • Questions: {item.questions} • Pass Benchmark: {item.benchmark}
                </Typography.Text>
              </div>
              <Tag color="blue" style={{ fontSize: 13, padding: '4px 10px' }}>
                {item.candidates} Completed
              </Tag>
            </div>
          </Card>
        )}
      />
    </UnifiedLayout>
  );
}
