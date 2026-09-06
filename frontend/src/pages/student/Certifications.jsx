import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Modal, Form, Input, Tag, message, List } from 'antd';
import { Award, Plus, ExternalLink } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { studentService } from '../../services/studentService';

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const loadCerts = async () => {
    try {
      const res = await studentService.getCertifications();
      setCerts(res.data);
    } catch (err) {
      message.error('Failed to load certifications');
    }
  };

  useEffect(() => {
    loadCerts();
  }, []);

  const handleAdd = async (values) => {
    try {
      await studentService.addCertification(values);
      message.success('Certification added to profile');
      form.resetFields();
      setOpen(false);
      loadCerts();
    } catch (err) {
      message.error('Failed to add certification');
    }
  };

  return (
    <UnifiedLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <Typography.Title level={3} style={{ color: '#1e3a8a', margin: 0 }}>
            Industry Certifications
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
            Manage verified credentials from AWS, Google Cloud, Meta, and CNCF.
          </Typography.Paragraph>
        </div>
        <Button type="primary" icon={<Plus size={16} />} onClick={() => setOpen(true)} style={{ borderRadius: 8 }}>
          Add Certification
        </Button>
      </div>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
        dataSource={certs}
        renderItem={(c) => (
          <List.Item>
            <Card style={{ borderRadius: 12 }}>
              <Award size={32} color="#2563eb" style={{ marginBottom: 8 }} />
              <Typography.Title level={5} style={{ color: '#1e3a8a', marginBottom: 4 }}>
                {c.title}
              </Typography.Title>
              <Typography.Text type="secondary" style={{ display: 'block', fontSize: 13 }}>
                Issued by: {c.issuing_org}
              </Typography.Text>
              <Typography.Text type="secondary" style={{ display: 'block', fontSize: 12, marginBottom: 12 }}>
                Date: {c.issue_date}
              </Typography.Text>
              <Tag color="success">Verified Credential</Tag>
            </Card>
          </List.Item>
        )}
      />

      <Modal title="Add Verified Certification" open={open} onCancel={() => setOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item name="title" label="Certification Title" rules={[{ required: true }]}>
            <Input placeholder="e.g. AWS Certified Solutions Architect Associate" />
          </Form.Item>
          <Form.Item name="issuing_org" label="Issuing Organization" rules={[{ required: true }]}>
            <Input placeholder="e.g. Amazon Web Services" />
          </Form.Item>
          <Form.Item name="issue_date" label="Issue Date" rules={[{ required: true }]}>
            <Input placeholder="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="credential_url" label="Verification / Badge URL">
            <Input placeholder="https://..." />
          </Form.Item>
          <Button type="primary" htmlType="submit" block style={{ borderRadius: 8 }}>Save</Button>
        </Form>
      </Modal>
    </UnifiedLayout>
  );
}
