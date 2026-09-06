import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Input, Select, Tag, Button } from 'antd';
import { UserOutlined, FilterOutlined, DownloadOutlined } from '@ant-design/icons';
import StudentTable from '../../components/institution/StudentTable';
import { institutionService } from '../../services/institutionService';

const { Option } = Select;

const StudentTracking = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await institutionService.getStudents();
      setStudents(res.data || []);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 700 }}>Student Readiness & Placement Tracking</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b' }}>Monitor academic progress, verified certifications, and career readiness scores</p>
        </div>
        <Button icon={<DownloadOutlined />}>Export CSV Report</Button>
      </div>

      <Card bordered={false} style={{ borderRadius: 12 }}>
        <StudentTable students={students} loading={loading} />
      </Card>
    </div>
  );
};

export default StudentTracking;
