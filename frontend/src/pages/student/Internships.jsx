import React, { useState, useEffect } from 'react';
import { Typography, message, Modal } from 'antd';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import InternshipCard from '../../components/student/InternshipCard';
import RAGExplanationCard from '../../components/common/RAGExplanationCard';
import { studentService } from '../../services/studentService';

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [profile, setProfile] = useState(null);
  const [appliedResult, setAppliedResult] = useState(null);

  const loadData = async () => {
    try {
      const [iRes, pRes] = await Promise.all([
        studentService.getInternships(),
        studentService.getProfile()
      ]);
      setInternships(iRes.data);
      setProfile(pRes.data);
    } catch (err) {
      message.error('Failed to load internships');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApply = async (item) => {
    try {
      const res = await studentService.applyInternship(item.id);
      message.success('Application submitted with RAG candidate evaluation!');
      setAppliedResult(res.data);
    } catch (err) {
      message.error('Application failed');
    }
  };

  return (
    <UnifiedLayout>
      <Typography.Title level={3} style={{ color: '#1e3a8a', marginBottom: 4 }}>
        Industry Internship Opportunities
      </Typography.Title>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Browse internships matching your profile with explainable RAG compatibility scores.
      </Typography.Paragraph>

      {appliedResult && (
        <Modal
          title="Application Evaluated by RAG Pipeline"
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
                'Review missing skill gaps before the interview',
                'Prepare project walkthrough aligned with employer tech stack'
              ]
            }}
            targetTitle="Internship Match Analysis"
          />
        </Modal>
      )}

      {internships.map((item) => (
        <InternshipCard
          key={item.id}
          internship={item}
          studentSkills={profile?.skills || []}
          onApply={handleApply}
        />
      ))}
    </UnifiedLayout>
  );
}
