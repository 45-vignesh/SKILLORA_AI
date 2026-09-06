import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Alert, Divider } from 'antd';
import { BankOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const { Title, Text } = Typography;

const InstitutionLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      await authService.login(values.email, values.password);
      navigate('/institution/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed. Please check your institutional credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', padding: 20 }}>
      <Card style={{ width: '100%', maxWidth: 440, borderRadius: 16, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 28 }}>
            <BankOutlined />
          </div>
          <Title level={3} style={{ margin: 0, fontWeight: 700 }}>Institution Portal</Title>
          <Text type="secondary">Monitor placements, track student readiness, and align curricula with industry standards</Text>
        </div>

        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

        <Form layout="vertical" onFinish={onFinish} initialValues={{ email: 'institution@skillora.ai', password: 'password123' }}>
          <Form.Item name="email" label="Official Institutional Email" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input prefix={<MailOutlined />} placeholder="tpo@university.edu.in" size="large" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter password' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ background: '#16a34a', borderColor: '#16a34a', height: 46, fontSize: 16, fontWeight: 600 }}>
            Sign In to Institution Portal
          </Button>
        </Form>

        <Divider style={{ margin: '20px 0' }} />

        <div style={{ textAlign: 'center', fontSize: 13, color: '#64748b' }}>
          Demo Credentials Preloaded: <b>institution@skillora.ai</b> / <b>password123</b>
        </div>
      </Card>
    </div>
  );
};

export default InstitutionLogin;
