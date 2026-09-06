import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Button, message } from 'antd';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { industryService } from '../../services/industryService';

export default function ManageInternships() {
  const [internships, setInternships] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await industryService.getInternships();
      setInternships(res.data);
    } catch (err) {
      message.error('Failed to load internships');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title', render: (t) => <strong>{t}</strong> },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    { title: 'Stipend', dataIndex: 'stipend', key: 'stipend' },
    { title: 'Applicants', dataIndex: 'applications_count', key: 'applications_count', render: (c) => <Tag color="purple">{c} Applied</Tag> },
  ];

  return (
    <UnifiedLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <Typography.Title level={3} style={{ color: '#1e3a8a', margin: 0 }}>
            Manage Internship Postings
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
            Oversee active undergraduate internships and applicant pools.
          </Typography.Paragraph>
        </div>
        <Button type="primary" icon={<Plus size={16} />} onClick={() => navigate('/industry/create-internship')} style={{ borderRadius: 8 }}>
          Post Internship
        </Button>
      </div>

      <Table columns={columns} dataSource={internships} rowKey="id" pagination={{ pageSize: 8 }} />
    </UnifiedLayout>
  );
}
