import React from 'react';
import { Card, Box, Typography, Chip, Button } from '@mui/material';
import { Tag } from 'antd';
import StatusBadge from '../common/StatusBadge';
import { Award, User, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ApplicantCard({ applicant, onStatusChange, onScheduleInterview }) {
  if (!applicant) return null;

  return (
    <Card sx={{ p: 2.5, mb: 2, border: '1px solid #e2e8f0', '&:hover': { borderColor: '#bfdbfe', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" fontWeight={700} color="#1e3a8a">
              {applicant.student_name}
            </Typography>
            <StatusBadge status={applicant.status} />
          </Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
            Applied for: <strong>{applicant.position}</strong> ({applicant.type})
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {applicant.department} • {applicant.institution} • CGPA: {applicant.cgpa}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1.5, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="caption" fontWeight={700} color="#065f46">
                Matched:
              </Typography>
              {applicant.why_matched?.slice(0, 3).map((m, idx) => (
                <Tag color="green" key={idx}>{m}</Tag>
              ))}
            </Box>
            {applicant.skill_gaps && applicant.skill_gaps.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="caption" fontWeight={700} color="#991b1b">
                  Gaps:
                </Typography>
                {applicant.skill_gaps.slice(0, 2).map((g, idx) => (
                  <Tag color="red" key={idx}>{g}</Tag>
                ))}
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ textAlign: 'right', minWidth: 160 }}>
          <Typography variant="caption" fontWeight={700} color="text.secondary">
            AI MATCH SCORE
          </Typography>
          <Typography variant="h5" fontWeight={800} color={applicant.match_score >= 70 ? '#10b981' : '#f59e0b'}>
            {applicant.match_score}%
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1.5 }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => onScheduleInterview(applicant)}
              sx={{ borderRadius: 1.5, fontSize: 11 }}
            >
              Schedule Interview
            </Button>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Button
                size="small"
                variant="outlined"
                color="success"
                onClick={() => onStatusChange(applicant.id, 'Shortlisted', applicant.type)}
                sx={{ borderRadius: 1.5, fontSize: 10, flex: 1 }}
              >
                Shortlist
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => onStatusChange(applicant.id, 'Rejected', applicant.type)}
                sx={{ borderRadius: 1.5, fontSize: 10, flex: 1 }}
              >
                Reject
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
