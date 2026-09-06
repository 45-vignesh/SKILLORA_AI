import React, { useState, useEffect } from 'react';
import { Typography, message, Modal, Form, Input, Button } from 'antd';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import ApplicantCard from '../../components/industry/ApplicantCard';
import { industryService } from '../../services/industryService';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const loadApps = async () => {
    try {
      const res = await industryService.getApplications();
      setApplications(res.data);
    } catch (err) {
      message.error('Failed to load applications');
    }
  };

  useEffect(() => {
    loadApps();
  }, []);

  const handleStatusChange = async (appId, newStatus, appType) => {
    try {
      await industryService.updateApplicationStatus(appId, newStatus, 'Status updated via portal', appType);
      message.success(`Status updated to ${newStatus}`);
      loadApps();
    } catch (err) {
      message.error('Update failed');
    }
  };

  const handleScheduleSubmit = async (values) => {
    try {
      await industryService.scheduleInterview({
        application_id: selectedApp.id,
        application_type: selectedApp.type,
        scheduled_time: values.time,
        meeting_link: values.meeting_link,
        interviewer: values.interviewer
      });
      message.success('Interview scheduled!');
      setModalOpen(false);
      form.resetFields();
      loadApps();
    } catch (err) {
      message.error('Failed to schedule interview');
    }
  };

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Candidate Applications Management
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Review student submissions with RAG match explanations, verified skills, and scheduling controls.
      </Typography.Paragraph>

      {applications.map((app) => (
        <ApplicantCard
          key={app.id}
          applicant={app}
          onStatusChange={handleStatusChange}
          onScheduleInterview={(item) => {
            setSelectedApp(item);
            setModalOpen(true);
          }}
        />
      ))}

      <Modal
        title={`Schedule Interview for ${selectedApp?.student_name}`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleScheduleSubmit}>
          <Form.Item name="time" label="Date & Time" initialValue="Tomorrow, 11:00 AM IST" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="interviewer" label="Lead Interviewer" initialValue="Technical Hiring Manager" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="meeting_link" label="Google Meet / Zoom URL" initialValue="https://meet.google.com/xyz-skillora-interview" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block style={{ borderRadius: 8 }}>Confirm Interview</Button>
        </Form>
      </Modal>
    </UnifiedLayout>
  );
}
