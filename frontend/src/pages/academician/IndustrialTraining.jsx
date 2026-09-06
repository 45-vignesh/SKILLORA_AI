import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tag, Button, Progress, Table } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { academicianService } from '../../services/academicianService';

const IndustrialTraining = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await academicianService.getTrainings();
      setTrainings(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { title: 'Program Title', dataIndex: 'title', key: 'title', render: text => <b>{text}</b> },
    { title: 'Industry Partner', dataIndex: 'provider', key: 'provider' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    { 
      title: 'Status', 
      key: 'status', 
      render: (_, __, idx) => (
        <Tag color={idx === 0 ? 'processing' : 'success'}>
          {idx === 0 ? 'In Progress (Module 3/5)' : 'Certified & Completed'}
        </Tag>
      ) 
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, __, idx) => (
        <Button size="small" icon={<DownloadOutlined />} disabled={idx === 0}>
          Certificate
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontWeight: 700 }}>Enrolled Industrial Upskilling Programs</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b' }}>Track your active immersion progress and accredited industry certifications</p>
      </div>

      <Card bordered={false} style={{ borderRadius: 12 }}>
        <Table dataSource={trainings} columns={columns} rowKey={(r, i) => r.id || i} pagination={false} />
      </Card>
    </div>
  );
};

export default IndustrialTraining;
