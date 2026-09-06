import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, message, Row, Col } from 'antd';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { industryService } from '../../services/industryService';

export default function IndustryProfile() {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState(null);

  const loadData = async () => {
    try {
      const res = await industryService.getProfile();
      setProfile(res.data);
      form.setFieldsValue(res.data);
    } catch (err) {
      message.error('Failed to load industry profile');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values) => {
    try {
      await industryService.updateProfile(values);
      message.success('Company profile updated successfully');
      loadData();
    } catch (err) {
      message.error('Update failed');
    }
  };

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Enterprise Company Profile
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Manage company headquarters, domain specializations, and recruiting contact details.
      </Typography.Paragraph>

      <Card style={{ borderRadius: 12 }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="company_name" label="Company Name" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="industry_type" label="Industry Sector">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="location" label="Headquarters Location">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="website" label="Official Website">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description" label="Company Overview & Engineering Culture">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" size="large" style={{ borderRadius: 8 }}>
            Save Company Profile
          </Button>
        </Form>
      </Card>
    </UnifiedLayout>
  );
}
