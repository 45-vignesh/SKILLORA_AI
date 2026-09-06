import React, { useState } from 'react';
import { Table, Tag, Input, Space, Button, Progress, Modal } from 'antd';
import { SearchOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import RAGExplanationCard from '../common/RAGExplanationCard';

const StudentTable = ({ students = [], loading = false }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const filteredData = students.filter(s => 
    (s.full_name || s.name || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (s.department || '').toLowerCase().includes(searchText.toLowerCase()) ||
    (s.skills || []).some(sk => sk.toLowerCase().includes(searchText.toLowerCase()))
  );

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1e293b' }}>{text || record.name || 'Anonymous Student'}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>{record.email || 'student@skillora.ai'}</div>
        </div>
      )
    },
    {
      title: 'Department & Year',
      key: 'dept',
      render: (_, record) => (
        <div>
          <span style={{ fontWeight: 500 }}>{record.department || 'Computer Science'}</span>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Year {record.year || 3} • CGPA {record.cgpa || '8.4'}</div>
        </div>
      )
    },
    {
      title: 'Target Role',
      dataIndex: 'target_role',
      key: 'target_role',
      render: (role) => <Tag color="blue">{role || 'Full Stack Developer'}</Tag>
    },
    {
      title: 'Industry Readiness',
      dataIndex: 'readiness_score',
      key: 'readiness_score',
      sorter: (a, b) => (a.readiness_score || 0) - (b.readiness_score || 0),
      render: (score) => {
        const val = score || 72;
        const color = val >= 80 ? '#10b981' : val >= 60 ? '#3b82f6' : '#f59e0b';
        return (
          <div style={{ width: 120 }}>
            <Progress percent={val} size="small" strokeColor={color} />
          </div>
        );
      }
    },
    {
      title: 'Top Skills',
      dataIndex: 'skills',
      key: 'skills',
      render: (skills) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 220 }}>
          {(skills || ['Python', 'React', 'SQL']).slice(0, 3).map((sk, idx) => (
            <Tag key={idx} style={{ margin: 0, fontSize: '11px' }}>{sk}</Tag>
          ))}
          {(skills || []).length > 3 && <Tag style={{ margin: 0, fontSize: '11px' }}>+{skills.length - 3}</Tag>}
        </div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          size="small" 
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedStudent(record);
            setDetailModalVisible(true);
          }}
        >
          View Profile
        </Button>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Input 
          prefix={<SearchOutlined style={{ color: '#94a3b8' }} />} 
          placeholder="Search by student name, department, or skill..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ maxWidth: 380, borderRadius: 8 }}
          allowClear
        />
        <div style={{ color: '#64748b', fontSize: '13px' }}>
          Showing <b>{filteredData.length}</b> verified students
        </div>
      </div>

      <Table 
        dataSource={filteredData} 
        columns={columns} 
        rowKey={(record, idx) => record.id || idx}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title={selectedStudent ? `${selectedStudent.full_name || selectedStudent.name} - Detailed Readiness Report` : 'Student Details'}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>Close</Button>
        ]}
        width={750}
      >
        {selectedStudent && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#64748b' }}>Department & CGPA</div>
                <div style={{ fontWeight: 600 }}>{selectedStudent.department || 'Computer Science'} ({selectedStudent.cgpa || '8.4'})</div>
              </div>
              <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#64748b' }}>Target Career</div>
                <div style={{ fontWeight: 600 }}>{selectedStudent.target_role || 'Full Stack Developer'}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#64748b' }}>Readiness Score</div>
                <div style={{ fontWeight: 700, color: '#2563eb' }}>{selectedStudent.readiness_score || 75}%</div>
              </div>
            </div>

            <RAGExplanationCard 
              matchScore={selectedStudent.readiness_score || 75}
              strengths={selectedStudent.skills || ['Python', 'SQL', 'FastAPI', 'React']}
              gaps={['Docker', 'Kubernetes', 'CI/CD Pipelines']}
              explanation="Student demonstrates strong algorithmic fundamentals and front-end proficiency. Recommended to complete containerization modules to reach 90%+ industry readiness."
              learningActions={[
                'Enroll in Docker & Container Fundamentals module',
                'Build a full-stack CI/CD capstone deployment on AWS/GCP',
                'Participate in byte-sized mock technical interview'
              ]}
              showActions={true}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentTable;
