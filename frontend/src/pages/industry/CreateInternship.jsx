import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, message, Row, Col, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { industryService } from '../../services/industryService';

export default function CreateInternship() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await industryService.createInternship({
        ...values,
        required_skills: values.required_skills ? values.required_skills.split(',').map(s => s.trim()) : ['Python', 'SQL'],
        preferred_skills: values.preferred_skills ? values.preferred_skills.split(',').map(s => s.trim()) : []
      });
      message.success('Internship opportunity posted successfully!');
      navigate('/industry/manage-internships');
    } catch (err) {
      message.error('Failed to post internship');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Post Internship Opportunity
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Create student internships with duration, stipend, and required skills for automated candidate matching.
      </Typography.Paragraph>

      <Card style={{ borderRadius: 12 }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col xs={24} sm={16}>
              <Form.Item name="title" label="Internship Title" rules={[{ required: true }]}>
                <Input placeholder="e.g. Cloud Infrastructure Intern" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="department" label="Division / Dept" initialValue="Cloud Engineering">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="location" label="Location" initialValue="Remote / Hybrid" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="duration" label="Duration" initialValue="6 Months" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="stipend" label="Monthly Stipend" initialValue="₹35,000 / month" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="required_skills" label="Required Skills (comma separated)" initialValue="Linux, Networking, AWS, Python" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description" label="Internship Description" initialValue="Assist engineering teams in configuring cloud networks, automated scripts, and test environments." rules={[{ required: true }]}>
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" size="large" loading={loading} style={{ borderRadius: 8, height: 44 }}>
            Publish Internship
          </Button>
        </Form>
      </Card>
    </UnifiedLayout>
  );
}
