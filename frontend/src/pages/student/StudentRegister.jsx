import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Select } from 'antd';
import { Box, Container, Paper } from '@mui/material';
import { Sparkles, Mail, Lock, User, School, BookOpen } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function StudentRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await authService.register({
        ...values,
        role: 'STUDENT'
      });
      message.success('Profile created successfully! Welcome to Skillora AI.');
      navigate('/student/dashboard');
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
            <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: '#2563eb', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <Sparkles size={24} />
            </Box>
            <Typography.Title level={3} style={{ margin: 0, color: '#1e3a8a', fontWeight: 800 }}>
              Create Student Account
            </Typography.Title>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              Join Skillora AI to bridge the academia-industry skill gap
            </Typography.Text>
          </Box>

          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item name="full_name" label="Full Name" rules={[{ required: true, message: 'Enter your name' }]}>
              <Input prefix={<User size={16} color="#94a3b8" />} placeholder="e.g. Aarav Sharma" size="large" />
            </Form.Item>

            <Form.Item name="email" label="College or Personal Email" rules={[{ required: true, type: 'email' }]}>
              <Input prefix={<Mail size={16} color="#94a3b8" />} placeholder="student@college.edu" size="large" />
            </Form.Item>

            <Form.Item name="password" label="Create Password" rules={[{ required: true, min: 6 }]}>
              <Input.Password prefix={<Lock size={16} color="#94a3b8" />} placeholder="••••••••" size="large" />
            </Form.Item>

            <Form.Item name="institution_or_company" label="Institution / University Name" rules={[{ required: true }]}>
              <Input prefix={<School size={16} color="#94a3b8" />} placeholder="e.g. National Institute of Technology" size="large" />
            </Form.Item>

            <Form.Item name="department_or_domain" label="Academic Department" rules={[{ required: true }]}>
              <Select size="large" placeholder="Select your department">
                <Select.Option value="Computer Science & Engineering">Computer Science & Engineering</Select.Option>
                <Select.Option value="Information Technology">Information Technology</Select.Option>
                <Select.Option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</Select.Option>
                <Select.Option value="Electronics & Communication">Electronics & Communication</Select.Option>
              </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large" block loading={loading} style={{ height: 44, borderRadius: 8, fontWeight: 600, marginTop: 12 }}>
              Complete Registration & Start RAG Profiling
            </Button>
          </Form>

          <Box sx={{ textAlign: 'center', mt: 2.5 }}>
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              Already registered? <Link to="/student/login" style={{ color: '#2563eb', fontWeight: 600 }}>Sign In</Link>
            </Typography.Text>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
