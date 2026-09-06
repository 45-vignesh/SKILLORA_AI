import React, { useState, useEffect } from 'react';
import { Typography, Card, Input, Select, Row, Col, Table, Tag, Slider, Button } from 'antd';
import { Search, Sparkles, User, ExternalLink } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { industryService } from '../../services/industryService';

export default function StudentSearch() {
  const [students, setStudents] = useState([]);
  const [skill, setSkill] = useState('');
  const [dept, setDept] = useState('');
  const [minReadiness, setMinReadiness] = useState(60);

  const searchStudents = async () => {
    try {
      const res = await industryService.searchStudents({
        skill: skill || undefined,
        department: dept || undefined,
        min_readiness: minReadiness
      });
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    searchStudents();
  }, [skill, dept, minReadiness]);

  const columns = [
    { title: 'Student Name', dataIndex: 'full_name', key: 'full_name', render: (t) => <strong>{t}</strong> },
    { title: 'Institution', dataIndex: 'institution_name', key: 'institution_name' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Target Role', dataIndex: 'target_role', key: 'target_role' },
    { title: 'CGPA', dataIndex: 'cgpa', key: 'cgpa' },
    {
      title: 'Readiness Score', dataIndex: 'readiness_score', key: 'readiness_score',
      render: (s) => <Tag color={s >= 80 ? 'green' : s >= 65 ? 'blue' : 'orange'} style={{ fontWeight: 700 }}>{s}%</Tag>
    },
    {
      title: 'Verified Skills', dataIndex: 'skills', key: 'skills',
      render: (skills) => (
        <span>{skills?.slice(0, 3).map((sk, idx) => <Tag key={idx}>{sk}</Tag>)}</span>
      )
    }
  ];

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        RAG AI Talent Discovery & Filtering
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 20 }}>
        Search verified candidate profiles by skill overlap, academic credentials, and calculated career readiness index.
      </Typography.Paragraph>

      <Card style={{ borderRadius: 12, marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={8}>
            <Typography.Text strong>Filter by Core Skill:</Typography.Text>
            <Input
              prefix={<Search size={14} color="#94a3b8" />}
              placeholder="e.g. Python, Docker, React, AWS"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              style={{ marginTop: 6 }}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Typography.Text strong>Academic Department:</Typography.Text>
            <Select
              allowClear
              placeholder="All Departments"
              value={dept || undefined}
              onChange={setDept}
              style={{ width: '100%', marginTop: 6 }}
            >
              <Select.Option value="Computer Science">Computer Science & Engineering</Select.Option>
              <Select.Option value="Information Technology">Information Technology</Select.Option>
              <Select.Option value="Artificial Intelligence">AI & Data Science</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={8}>
            <Typography.Text strong>Min Readiness: {minReadiness}%</Typography.Text>
            <Slider value={minReadiness} min={0} max={100} onChange={setMinReadiness} />
          </Col>
        </Row>
      </Card>

      <Table columns={columns} dataSource={students} rowKey="id" pagination={{ pageSize: 8 }} />
    </UnifiedLayout>
  );
}
