import React, { useState, useEffect } from 'react';
import { Typography, Card, Table, Tag, Button, Modal, Form, Input, message } from 'antd';
import { School, Plus } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { industryService } from '../../services/industryService';

export default function FacultyTraining() {
  const [trainings, setTrainings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const loadData = async () => {
    try {
      const res = await industryService.getFacultyTrainings();
      setTrainings(res.data);
    } catch (err) {
      message.error('Failed to load faculty trainings');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (values) => {
    try {
      await industryService.createFacultyTraining(values);
      message.success('Faculty Training Program (FDP) posted successfully!');
      setModalOpen(false);
      form.resetFields();
      loadData();
    } catch (err) {
      message.error('Failed to create program');
    }
  };

  const columns = [
    { title: 'Program Title', dataIndex: 'title', key: 'title', render: (t) => <strong>{t}</strong> },
    { title: 'Domain', dataIndex: 'domain', key: 'domain' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration' },
    { title: 'Mode', dataIndex: 'mode', key: 'mode', render: (m) => <Tag color="geekblue">{m}</Tag> },
    { title: 'Start Date', dataIndex: 'start_date', key: 'start_date' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s) => <Tag color="green">{s}</Tag> }
  ];

  return (
    <UnifiedLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <Typography.Title level={3} style={{ color: '#1e3a8a', margin: 0 }}>
            Faculty Development Programs (FDP) & Industrial Immersion
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
            Connect academic faculty with enterprise engineering best practices and research tooling.
          </Typography.Paragraph>
        </div>
        <Button type="primary" icon={<Plus size={16} />} onClick={() => setModalOpen(true)} style={{ borderRadius: 8 }}>
          Post Faculty Training
        </Button>
      </div>

      <Table columns={columns} dataSource={trainings} rowKey="id" pagination={{ pageSize: 8 }} />

      <Modal title="Post Faculty Training Program (FDP)" open={modalOpen} onCancel={() => setModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="title" label="Program Title" rules={[{ required: true }]}>
            <Input placeholder="e.g. Industry Immersion in Generative AI & Cloud Native Systems" />
          </Form.Item>
          <Form.Item name="domain" label="Domain" initialValue="Cloud & AI">
            <Input />
          </Form.Item>
          <Form.Item name="duration" label="Duration" initialValue="2 Weeks">
            <Input />
          </Form.Item>
          <Form.Item name="mode" label="Mode (Online/Hybrid/Onsite)" initialValue="Hybrid">
            <Input />
          </Form.Item>
          <Form.Item name="start_date" label="Start Date" initialValue="2026-10-15">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Curriculum Description" initialValue="Hands-on training for university faculty covering real-world cloud architectures.">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block style={{ borderRadius: 8 }}>Publish Program</Button>
        </Form>
      </Modal>
    </UnifiedLayout>
  );
}
