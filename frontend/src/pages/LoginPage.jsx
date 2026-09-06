import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Button, Typography, Alert, Divider } from 'antd';
import { LockOutlined, MailOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const { Title, Text, Paragraph } = Typography;

export default function LoginPage() {
  const [role, setRole] = useState('STUDENT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const roleDefaults = {
    STUDENT: { email: 'student@skillora.ai', path: '/student/dashboard', color: '#2563eb' },
    INDUSTRY: { email: 'industry@skillora.ai', path: '/industry/dashboard', color: '#7c3aed' },
    INSTITUTION: { email: 'institution@skillora.ai', path: '/institution/dashboard', color: '#16a34a' },
    ACADEMICIAN: { email: 'academician@skillora.ai', path: '/academician/dashboard', color: '#d97706' },
  };

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      await authService.login(values.email, values.password);
      navigate(roleDefaults[role].path);
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: 20
    }}>
      <Card style={{ width: '100%', maxWidth: 460, borderRadius: 16, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#ffffff', fontSize: 24
          }}>
            <ThunderboltOutlined />
          </div>
          <Title level={3} style={{ margin: 0, fontWeight: 800 }}>Sign In to SKILLORA AI</Title>
          <Text type="secondary">SIH26044 • Academia–Industry Collaboration Platform</Text>
        </div>

        <Tabs
          activeKey={role}
          onChange={setRole}
          centered
          items={[
            { key: 'STUDENT', label: 'Student' },
            { key: 'INDUSTRY', label: 'Industry' },
            { key: 'INSTITUTION', label: 'Institution' },
            { key: 'ACADEMICIAN', label: 'Academician' },
          ]}
        />

        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

        <Form
          key={role}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ email: roleDefaults[role].email, password: 'password123' }}
        >
          <Form.Item name="email" label="Account Email" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input prefix={<MailOutlined />} size="large" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password' }]}>
            <Input.Password prefix={<LockOutlined />} size="large" />
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            block 
            loading={loading}
            style={{ 
              background: roleDefaults[role].color, 
              borderColor: roleDefaults[role].color,
              height: 46, fontSize: 16, fontWeight: 600, marginTop: 8 
            }}
          >
            Sign In as {role}
          </Button>
        </Form>

        <Divider style={{ margin: '20px 0' }} />

        <div style={{ textAlign: 'center', fontSize: 13, color: '#64748b' }}>
          Preloaded Demo Credentials: <b>{roleDefaults[role].email}</b> / <b>password123</b>
        </div>
      </Card>
    </div>
  );
}
