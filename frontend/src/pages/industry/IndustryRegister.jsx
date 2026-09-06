import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Select } from 'antd';
import { Box, Container, Paper } from '@mui/material';
import { Building, Mail, Lock, Globe } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function IndustryRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await authService.register({
        ...values,
        role: 'INDUSTRY'
      });
      message.success('Company registered! Welcome to Skillora AI.');
      navigate('/industry/dashboard');
    } catch (err) {
      message.error(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc', p: 2 }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: '#7c3aed', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <Building size={24} />
            </Box>
            <Typography.Title level={3} style={{ margin: 0, color: '#1e3a8a', fontWeight: 800 }}>
              Register Enterprise Partner
            </Typography.Title>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              Connect with colleges, discover skill-verified talent, and post internships
            </Typography.Text>
          </Box>

          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item name="full_name" label="Contact Person / Recruiter Name" rules={[{ required: true }]}>
              <Input placeholder="e.g. Vikram Malhotra" size="large" />
            </Form.Item>

            <Form.Item name="institution_or_company" label="Company Name" rules={[{ required: true }]}>
              <Input placeholder="e.g. TechNova Systems" size="large" />
            </Form.Item>

            <Form.Item name="email" label="Company Work Email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="recruiter@technova.com" size="large" />
            </Form.Item>

            <Form.Item name="password" label="Create Password" rules={[{ required: true, min: 6 }]}>
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>

            <Form.Item name="department_or_domain" label="Primary Industry Sector" rules={[{ required: true }]}>
              <Select size="large" placeholder="Select domain">
                <Select.Option value="Enterprise Cloud & Software">Enterprise Cloud & Software</Select.Option>
                <Select.Option value="Artificial Intelligence & Data Tech">Artificial Intelligence & Data Tech</Select.Option>
                <Select.Option value="Financial Technology">Financial Technology</Select.Option>
                <Select.Option value="Cybersecurity">Cybersecurity</Select.Option>
              </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ height: 44, borderRadius: 8, fontWeight: 600, background: '#7c3aed' }}>
              Register Industry Account
            </Button>
          </Form>

          <Box sx={{ textAlign: 'center', mt: 2.5 }}>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              Already registered? <Link to="/industry/login" style={{ color: '#7c3aed', fontWeight: 600 }}>Sign In</Link>
            </Typography.Text>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
