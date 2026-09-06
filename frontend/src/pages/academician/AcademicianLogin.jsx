import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Alert, Divider } from 'antd';
import { ReadOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const { Title, Text } = Typography;

const AcademicianLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      await authService.login(values.email, values.password);
      navigate('/academician/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed. Please verify faculty credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #311042 50%, #0f172a 100%)', padding: 20 }}>
      <Card style={{ width: '100%', maxWidth: 440, borderRadius: 16, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 28 }}>
            <ReadOutlined />
          </div>
          <Title level={3} style={{ margin: 0, fontWeight: 700 }}>Academician Portal</Title>
          <Text type="secondary">Bridge research with industry, access corporate sabbaticals, and lead joint innovation labs</Text>
        </div>

        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

        <Form layout="vertical" onFinish={onFinish} initialValues={{ email: 'academician@skillora.ai', password: 'password123' }}>
          <Form.Item name="email" label="Institutional Faculty Email" rules={[{ required: true, message: 'Please enter faculty email' }]}>
            <Input prefix={<MailOutlined />} placeholder="prof.sharma@niet.edu.in" size="large" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ background: '#7c3aed', borderColor: '#7c3aed', height: 46, fontSize: 16, fontWeight: 600 }}>
            Sign In to Faculty Portal
          </Button>
        </Form>

        <Divider style={{ margin: '20px 0' }} />

        <div style={{ textAlign: 'center', fontSize: 13, color: '#64748b' }}>
          Demo Credentials Preloaded: <b>academician@skillora.ai</b> / <b>password123</b>
        </div>
      </Card>
    </div>
  );
};

export default AcademicianLogin;
