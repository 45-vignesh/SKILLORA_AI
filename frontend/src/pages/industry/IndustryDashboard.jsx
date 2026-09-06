import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, Box, Button, Chip } from '@mui/material';
import { Table, Tag, Modal, Form, Input, DatePicker, message, Spin } from 'antd';
import { Briefcase, Users, Calendar, Award, Plus, Sparkles, Video, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import ApplicantCard from '../../components/industry/ApplicantCard';
import StatusBadge from '../../components/common/StatusBadge';
import { industryService } from '../../services/industryService';

export default function IndustryDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [form] = Form.useForm();

  const loadData = async () => {
    try {
      const [pRes, jRes, iRes, aRes, vRes] = await Promise.all([
        industryService.getProfile(),
        industryService.getJobs(),
        industryService.getInternships(),
        industryService.getApplications(),
        industryService.getInterviews()
      ]);
      setProfile(pRes.data);
      setJobs(jRes.data);
      setInternships(iRes.data);
      setApplications(aRes.data);
      setInterviews(vRes.data);
    } catch (err) {
      console.error(err);
      message.error('Failed to load industry dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (appId, newStatus, appType) => {
    try {
      await industryService.updateApplicationStatus(appId, newStatus, 'Reviewed by talent team', appType);
      message.success(`Candidate status updated to ${newStatus}`);
      loadData();
    } catch (err) {
      message.error('Status update failed');
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
      message.success('Interview scheduled and invite dispatched!');
      setInterviewModalOpen(false);
      form.resetFields();
      loadData();
    } catch (err) {
      message.error('Failed to schedule interview');
    }
  };

  if (loading) {
    return (
      <UnifiedLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
          <Spin size="large" tip="Loading Enterprise Talent Dashboard..." />
        </Box>
      </UnifiedLayout>
    );
  }

  return (
    <UnifiedLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <div>
          <Typography variant="h4" fontWeight={800} color="#1e3a8a">
            {profile?.company_name || 'TechNova Systems'} • Talent Portal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AI candidate discovery, automated vector skill matching, and university recruitment.
          </Typography>
        </div>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" startIcon={<Search size={16} />} onClick={() => navigate('/industry/student-search')}>
            Find Candidates
          </Button>
          <Button variant="contained" startIcon={<Plus size={16} />} onClick={() => navigate('/industry/create-job')}>
            Post Job
          </Button>
        </Box>
      </Box>

      {/* Metric Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: '#eff6ff', borderRadius: 2, color: '#2563eb' }}>
              <Briefcase size={24} />
            </Box>
            <div>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>ACTIVE JOB POSTS</Typography>
              <Typography variant="h5" fontWeight={800} color="#1e3a8a">{jobs.length}</Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: '#f3e8ff', borderRadius: 2, color: '#7c3aed' }}>
              <Award size={24} />
            </Box>
            <div>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>INTERNSHIPS</Typography>
              <Typography variant="h5" fontWeight={800} color="#1e3a8a">{internships.length}</Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: '#ecfdf5', borderRadius: 2, color: '#10b981' }}>
              <Users size={24} />
            </Box>
            <div>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>TOTAL APPLICANTS</Typography>
              <Typography variant="h5" fontWeight={800} color="#1e3a8a">{applications.length}</Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: '#fef3c7', borderRadius: 2, color: '#d97706' }}>
              <Video size={24} />
            </Box>
            <div>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>SCHEDULED INTERVIEWS</Typography>
              <Typography variant="h5" fontWeight={800} color="#1e3a8a">{interviews.length}</Typography>
            </div>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Applications with RAG Explainable breakdown */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight={700} color="#1e3a8a" gutterBottom>
          Recent Candidate Applications (RAG Match Ranking)
        </Typography>
        {applications.slice(0, 4).map((app) => (
          <ApplicantCard
            key={app.id}
            applicant={app}
            onStatusChange={handleStatusChange}
            onScheduleInterview={(item) => {
              setSelectedApp(item);
              setInterviewModalOpen(true);
            }}
          />
        ))}
      </Box>

      {/* Scheduled Interviews Roster */}
      <Card sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={700} color="#1e3a8a" gutterBottom>
          Upcoming Technical Interviews
        </Typography>
        <Table
          dataSource={interviews}
          rowKey="id"
          pagination={false}
          columns={[
            { title: 'Time', dataIndex: 'scheduled_time', key: 'scheduled_time' },
            { title: 'Interviewer', dataIndex: 'interviewer', key: 'interviewer' },
            { title: 'Meeting URL', dataIndex: 'meeting_link', key: 'meeting_link', render: (url) => <a href={url} target="_blank" rel="noreferrer">{url}</a> },
            { title: 'Status', dataIndex: 'status', key: 'status', render: (s) => <Tag color="green">{s}</Tag> }
          ]}
        />
      </Card>

      {/* Interview Modal */}
      <Modal
        title={`Schedule Technical Interview for ${selectedApp?.student_name}`}
        open={interviewModalOpen}
        onCancel={() => setInterviewModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleScheduleSubmit}>
          <Form.Item name="time" label="Date & Time" initialValue="Tomorrow, 11:00 AM IST" rules={[{ required: true }]}>
            <Input placeholder="e.g. 2026-09-10 at 11:00 AM IST" />
          </Form.Item>
          <Form.Item name="interviewer" label="Lead Interviewer" initialValue="Senior Cloud Architect" rules={[{ required: true }]}>
            <Input placeholder="e.g. Sundeep Rao" />
          </Form.Item>
          <Form.Item name="meeting_link" label="Google Meet / Zoom URL" initialValue="https://meet.google.com/xyz-skillora-interview" rules={[{ required: true }]}>
            <Input placeholder="https://meet.google.com/..." />
          </Form.Item>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Confirm & Send Candidate Invitation
          </Button>
        </Form>
      </Modal>
    </UnifiedLayout>
  );
}
