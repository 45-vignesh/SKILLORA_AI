import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Button, message } from 'antd';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { industryService } from '../../services/industryService';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const loadJobs = async () => {
    try {
      const res = await industryService.getJobs();
      setJobs(res.data);
    } catch (err) {
      message.error('Failed to load jobs');
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const columns = [
    { title: 'Job Title', dataIndex: 'title', key: 'title', render: (t) => <strong>{t}</strong> },
    { title: 'Type', dataIndex: 'job_type', key: 'job_type' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Salary', dataIndex: 'salary_range', key: 'salary_range' },
    { title: 'Applicants', dataIndex: 'applications_count', key: 'applications_count', render: (c) => <Tag color="blue">{c} Applied</Tag> },
    {
      title: 'Skills Required', dataIndex: 'required_skills', key: 'required_skills',
      render: (skills) => (
        <span>
          {skills?.slice(0, 3).map((s, idx) => (
            <Tag key={idx}>{s}</Tag>
          ))}
        </span>
      )
    }
  ];

  return (
    <UnifiedLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <Typography.Title level={3} style={{ color: '#1e3a8a', margin: 0 }}>
            Manage Posted Job Openings
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
            Review active roles, applicant volume, and indexing status.
          </Typography.Paragraph>
        </div>
        <Button type="primary" icon={<Plus size={16} />} onClick={() => navigate('/industry/create-job')} style={{ borderRadius: 8 }}>
          Post New Job
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={jobs}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />
    </UnifiedLayout>
  );
}
