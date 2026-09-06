import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Modal, Form, Input, Tag, message, List } from 'antd';
import { FolderGit2, Plus, Github, Globe } from 'lucide-react';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import { studentService } from '../../services/studentService';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const loadProjects = async () => {
    try {
      const res = await studentService.getProjects();
      setProjects(res.data);
    } catch (err) {
      message.error('Failed to load projects');
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAdd = async (values) => {
    try {
      await studentService.addProject({
        ...values,
        tech_stack: values.tech_stack ? values.tech_stack.split(',').map(s => s.trim()) : ['Python', 'React']
      });
      message.success('Project added to portfolio');
      form.resetFields();
      setOpen(false);
      loadProjects();
    } catch (err) {
      message.error('Failed to add project');
    }
  };

  return (
    <UnifiedLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <Typography.Title level={3} style={{ color: '#1e3a8a', margin: 0 }}>
            Capstone & Personal Projects Portfolio
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
            Showcase technical work samples to industry recruiters.
          </Typography.Paragraph>
        </div>
        <Button type="primary" icon={<Plus size={16} />} onClick={() => setOpen(true)} style={{ borderRadius: 8 }}>
          Add Project
        </Button>
      </div>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2 }}
        dataSource={projects}
        renderItem={(p) => (
          <List.Item>
            <Card style={{ borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <FolderGit2 size={22} color="#2563eb" />
                <Typography.Title level={5} style={{ color: '#1e3a8a', margin: 0 }}>
                  {p.title}
                </Typography.Title>
              </div>
              <Typography.Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 12 }}>
                {p.description}
              </Typography.Paragraph>
              <div style={{ marginBottom: 12 }}>
                {p.tech_stack?.map((t, idx) => (
                  <Tag color="blue" key={idx}>{t}</Tag>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                {p.github_url && (
                  <a href={p.github_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#475569', fontSize: 13 }}>
                    <Github size={14} /> Repository
                  </a>
                )}
                {p.live_url && (
                  <a href={p.live_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10b981', fontSize: 13 }}>
                    <Globe size={14} /> Live Demo
                  </a>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />

      <Modal title="Add Project to Portfolio" open={open} onCancel={() => setOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item name="title" label="Project Title" rules={[{ required: true }]}>
            <Input placeholder="e.g. Distributed Task Queue" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="Architecture, key challenges solved, and performance results..." />
          </Form.Item>
          <Form.Item name="tech_stack" label="Tech Stack (comma separated)">
            <Input placeholder="Python, FastAPI, Redis, Docker" />
          </Form.Item>
          <Form.Item name="github_url" label="GitHub URL">
            <Input placeholder="https://github.com/..." />
          </Form.Item>
          <Form.Item name="live_url" label="Live Deployment URL">
            <Input placeholder="https://..." />
          </Form.Item>
          <Button type="primary" htmlType="submit" block style={{ borderRadius: 8 }}>Save Project</Button>
        </Form>
      </Modal>
    </UnifiedLayout>
  );
}
