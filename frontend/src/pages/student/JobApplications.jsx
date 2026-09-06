import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Table, Tag, Modal, message } from 'antd';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import JobCard from '../../components/student/JobCard';
import RAGExplanationCard from '../../components/common/RAGExplanationCard';
import StatusBadge from '../../components/common/StatusBadge';
import { studentService } from '../../services/studentService';

export default function JobApplications() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);
  const [appliedResult, setAppliedResult] = useState(null);
  const [activeTab, setActiveTab] = useState('browse');

  const loadData = async () => {
    try {
      const [jRes, aRes, pRes] = await Promise.all([
        studentService.getJobs(),
        studentService.getMyJobApplications(),
        studentService.getProfile()
      ]);
      setJobs(jRes.data);
      setApplications(aRes.data);
      setProfile(pRes.data);
    } catch (err) {
      message.error('Failed to load jobs');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApply = async (job) => {
    try {
      const res = await studentService.applyJob(job.id);
      message.success('Job application submitted!');
      setAppliedResult(res.data);
      loadData();
    } catch (err) {
      message.error('Application failed');
    }
  };

  const appColumns = [
    { title: 'Job Title', dataIndex: 'title', key: 'title', render: (t) => <strong>{t}</strong> },
    { title: 'Company', dataIndex: 'company_name', key: 'company_name' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s) => <StatusBadge status={s} /> },
    { title: 'RAG Match', dataIndex: 'match_score', key: 'match_score', render: (m) => <Tag color={m >= 70 ? 'green' : 'orange'}>{m}%</Tag> },
    { title: 'Applied On', dataIndex: 'applied_at', key: 'applied_at', render: (d) => new Date(d).toLocaleDateString() }
  ];

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Job Opportunities & Applications
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 20 }}>
        Discover entry-level roles and track the end-to-end recruitment lifecycle.
      </Typography.Paragraph>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: 'browse', label: `Available Openings (${jobs.length})` },
          { key: 'applied', label: `My Applications (${applications.length})` }
        ]}
      />

      {appliedResult && (
        <Modal
          title="Job Application Submission Evaluation"
          open={Boolean(appliedResult)}
          onCancel={() => setAppliedResult(null)}
          footer={null}
          width={700}
        >
          <RAGExplanationCard
            aiData={{
              readiness_score: appliedResult.match_score,
              matched_skills: appliedResult.why_matched,
              skill_gaps: appliedResult.skill_gaps,
              explanation: appliedResult.explanation,
              recommendations: [
                'Review interview questions on matched core skills',
                'Prepare deployment architecture diagrams for technical screening'
              ]
            }}
            targetTitle="Job Fit Analysis"
          />
        </Modal>
      )}

      {activeTab === 'browse' ? (
        <div>
          {jobs.map((j) => (
            <JobCard
              key={j.id}
              job={j}
              studentSkills={profile?.skills || []}
              onApply={handleApply}
            />
          ))}
        </div>
      ) : (
        <Table
          columns={appColumns}
          dataSource={applications}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </UnifiedLayout>
  );
}
