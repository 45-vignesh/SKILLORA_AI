import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Divider } from 'antd';
import { Box, Container, Paper, Avatar } from '@mui/material';
import { Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function StudentLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await authService.login(values.email, values.password);
      message.success('Welcome to Skillora AI Student Portal!');
      navigate('/student/dashboard');
    } catch (err) {
      message.error(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setLoading(true);
    try {
      await authService.login('student@skillora.ai', 'password123');
      message.success('Logged in with Demo Student credentials');
      navigate('/student/dashboard');
    } catch (err) {
      message.error('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc', p: 2 }}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 2.5, bgcolor: '#2563eb', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
              <Sparkles size={26} />
            </Box>
            <Typography.Title level={3} style={{ margin: 0, color: '#1e3a8a', fontWeight: 800 }}>
              Student Portal
            </Typography.Title>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              Sign in to your Skillora AI career acceleration hub
            </Typography.Text>
          </Box>

          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Enter valid email' }]}>
              <Input prefix={<Mail size={16} color="#94a3b8" />} placeholder="student@skillora.ai" size="large" />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Enter your password' }]}>
              <Input.Password prefix={<Lock size={16} color="#94a3b8" />} placeholder="••••••••" size="large" />
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ height: 44, borderRadius: 8, fontWeight: 600, marginTop: 8 }}>
              Sign In
            </Button>
          </Form>

          <Button type="dashed" block size="large" onClick={handleQuickDemo} style={{ height: 44, borderRadius: 8, marginTop: 12, borderColor: '#2563eb', color: '#2563eb', fontWeight: 600 }}>
            Quick Demo Login (Aarav Sharma)
          </Button>

          <Divider style={{ margin: '20px 0' }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              Don't have an account? <Link to="/student/register" style={{ color: '#2563eb', fontWeight: 600 }}>Create Profile</Link>
            </Typography.Text>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
