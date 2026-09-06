import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Divider } from 'antd';
import { Box, Container, Paper } from '@mui/material';
import { Sparkles, Lock, Mail, Building } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function IndustryLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await authService.login(values.email, values.password);
      message.success('Welcome to Skillora AI Industry Portal!');
      navigate('/industry/dashboard');
    } catch (err) {
      message.error(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setLoading(true);
    try {
      await authService.login('industry@skillora.ai', 'password123');
      message.success('Logged in with Demo Industry credentials');
      navigate('/industry/dashboard');
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
            <Box sx={{ width: 48, height: 48, borderRadius: 2.5, bgcolor: '#7c3aed', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>
              <Building size={26} />
            </Box>
            <Typography.Title level={3} style={{ margin: 0, color: '#1e3a8a', fontWeight: 800 }}>
              Industry Portal
            </Typography.Title>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              Recruit job-ready talent and manage collaborative academic programs
            </Typography.Text>
          </Box>

          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item name="email" label="Company Work Email" rules={[{ required: true, type: 'email' }]}>
              <Input prefix={<Mail size={16} color="#94a3b8" />} placeholder="recruiter@technova.com" size="large" />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password prefix={<Lock size={16} color="#94a3b8" />} placeholder="••••••••" size="large" />
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ height: 44, borderRadius: 8, fontWeight: 600, background: '#7c3aed' }}>
              Sign In to Industry Hub
            </Button>
          </Form>

          <Button type="dashed" block size="large" onClick={handleQuickDemo} style={{ height: 44, borderRadius: 8, marginTop: 12, borderColor: '#7c3aed', color: '#7c3aed', fontWeight: 600 }}>
            Quick Demo Login (TechNova Systems)
          </Button>

          <Divider style={{ margin: '20px 0' }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              Need partner onboarding? <Link to="/industry/register" style={{ color: '#7c3aed', fontWeight: 600 }}>Register Company</Link>
            </Typography.Text>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
