import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Row, Col, Select } from 'antd';
import { Sparkles, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { industryService } from '../../services/industryService';

export default function CreateJob() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await industryService.createJob({
        ...values,
        required_skills: values.required_skills ? values.required_skills.split(',').map(s => s.trim()) : ['Python', 'SQL'],
        preferred_skills: values.preferred_skills ? values.preferred_skills.split(',').map(s => s.trim()) : []
      });
      message.success('Job listing created and automatically indexed into RAG Knowledge Base!');
      navigate('/industry/manage-jobs');
    } catch (err) {
      message.error('Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Post New Entry-Level Job Opening
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Job requirements will be immediately processed, chunked, and embedded into the RAG vector store for candidate matching.
      </Typography.Paragraph>

      <Card style={{ borderRadius: 12 }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col xs={24} sm={16}>
              <Form.Item name="title" label="Job Title" rules={[{ required: true }]}>
                <Input placeholder="e.g. Associate Cloud Infrastructure Engineer" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="job_type" label="Job Type" initialValue="Full-time">
                <Select size="large">
                  <Select.Option value="Full-time">Full-time</Select.Option>
                  <Select.Option value="Part-time">Part-time</Select.Option>
                  <Select.Option value="Remote">Remote</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="location" label="Location" initialValue="Bengaluru, India" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="salary_range" label="Annual Compensation" initialValue="₹9,00,000 - ₹14,00,000 P.A." rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="experience_required" label="Experience Required" initialValue="0-2 Years">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="eligibility" label="Eligibility Criteria" initialValue="B.Tech/M.Tech in CS/IT or related, Min 7.0 CGPA">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="required_skills" label="Mandatory Core Skills (comma separated)" initialValue="Linux, AWS, Docker, Networking, Python" rules={[{ required: true }]}>
                <Input size="large" placeholder="e.g. React, Node.js, SQL, Docker" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="preferred_skills" label="Preferred Bonus Skills (comma separated)" initialValue="Terraform, Kubernetes, CI/CD">
                <Input size="large" placeholder="e.g. TypeScript, GraphQL" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description" label="Detailed Role & Responsibilities" initialValue="Deploy and manage cloud infrastructure, build microservices, and automate deployment verification." rules={[{ required: true }]}>
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" size="large" loading={loading} style={{ borderRadius: 8, height: 44, fontWeight: 600 }}>
            Publish Job & Vectorize Requirements
          </Button>
        </Form>
      </Card>
    </UnifiedLayout>
  );
}
