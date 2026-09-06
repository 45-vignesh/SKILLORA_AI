import React, { useState, useEffect } from 'react';
import { Typography, Card, Table, Tag, Button, Modal, message } from 'antd';
import { Video, Calendar } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { industryService } from '../../services/industryService';

export default function Interview() {
  const [interviews, setInterviews] = useState([]);

  const loadData = async () => {
    try {
      const res = await industryService.getInterviews();
      setInterviews(res.data);
    } catch (err) {
      message.error('Failed to load interviews');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    { title: 'Date & Time', dataIndex: 'scheduled_time', key: 'scheduled_time', render: (t) => <strong>{t}</strong> },
    { title: 'Type', dataIndex: 'application_type', key: 'application_type' },
    { title: 'Interviewer', dataIndex: 'interviewer', key: 'interviewer' },
    { title: 'Meeting Link', dataIndex: 'meeting_link', key: 'meeting_link', render: (l) => <a href={l} target="_blank" rel="noreferrer">Join Meeting</a> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s) => <Tag color="green">{s}</Tag> }
  ];

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Interview Management & Video Schedules
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 20 }}>
        Track ongoing technical and HR evaluation interviews.
      </Typography.Paragraph>

      <Table columns={columns} dataSource={interviews} rowKey="id" pagination={{ pageSize: 8 }} />
    </UnifiedLayout>
  );
}
