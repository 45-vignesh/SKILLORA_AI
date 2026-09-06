import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, InputNumber, Typography, message, Row, Col, Select } from 'antd';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import SkillCard from '../../components/student/SkillCard';
import { studentService } from '../../services/studentService';

export default function StudentProfile() {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const res = await studentService.getProfile();
      setProfile(res.data);
      form.setFieldsValue(res.data);
    } catch (err) {
      message.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const onFinish = async (values) => {
    try {
      await studentService.updateProfile(values);
      message.success('Profile updated successfully');
      loadProfile();
    } catch (err) {
      message.error('Update failed');
    }
  };

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Student Profile & Academic Portfolio
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Keep your details up to date for precise AI career recommendations and recruitment discovery.
      </Typography.Paragraph>

      <SkillCard skills={profile?.skills} onRefresh={loadProfile} />

      <Card title="Personal & Academic Information" style={{ borderRadius: 12, marginBottom: 24 }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="full_name" label="Full Name">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="email" label="Email Address">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="roll_number" label="Roll Number">
                <Input placeholder="e.g. 22CS0104" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="institution_name" label="Institution / University">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="department" label="Department">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item name="year_of_study" label="Year of Study">
                <InputNumber min={1} max={5} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item name="cgpa" label="Cumulative GPA (CGPA)">
                <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="target_role" label="Target Career Role">
                <Select placeholder="Select primary career goal">
                  <Select.Option value="Cloud Engineer">Cloud Engineer</Select.Option>
                  <Select.Option value="Full Stack Developer">Full Stack Developer</Select.Option>
                  <Select.Option value="AI/ML Engineer">AI/ML Engineer</Select.Option>
                  <Select.Option value="DevOps Engineer">DevOps Engineer</Select.Option>
                  <Select.Option value="Cybersecurity Analyst">Cybersecurity Analyst</Select.Option>
                  <Select.Option value="Data Scientist">Data Scientist</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="phone" label="Phone Number">
                <Input placeholder="+91 98765 43210" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="bio" label="Professional Summary / Bio">
                <Input.TextArea rows={3} placeholder="Brief statement regarding your engineering interests and experience..." />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="github_url" label="GitHub Profile URL">
                <Input placeholder="https://github.com/..." />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="linkedin_url" label="LinkedIn Profile URL">
                <Input placeholder="https://linkedin.com/in/..." />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="portfolio_url" label="Personal Portfolio Website">
                <Input placeholder="https://myportfolio.dev" />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" size="large" style={{ borderRadius: 8 }}>
            Save Profile Changes
          </Button>
        </Form>
      </Card>
    </UnifiedLayout>
  );
}
