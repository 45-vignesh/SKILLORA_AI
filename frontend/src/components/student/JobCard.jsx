import React from 'react';
import { Card, Box, Typography, Chip, Button } from '@mui/material';
import { MapPin, Briefcase, DollarSign, Calendar, Sparkles } from 'lucide-react';
import { Progress } from 'antd';

export default function JobCard({ job, onApply, studentSkills = [] }) {
  if (!job) return null;

  // Compute immediate match estimate
  const reqSkills = job.required_skills || [];
  const studentLower = studentSkills.map(s => (typeof s === 'string' ? s : s.name || '').toLowerCase());
  const matched = reqSkills.filter(r => studentLower.includes(r.toLowerCase()));
  const score = Math.round((matched.length / Math.max(reqSkills.length, 1)) * 100);

  return (
    <Card sx={{ p: 2.5, mb: 2.5, border: '1px solid #e2e8f0', '&:hover': { borderColor: '#bfdbfe', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={700} color="#1e3a8a">
            {job.title}
          </Typography>
          <Typography variant="subtitle2" fontWeight={600} color="#2563eb" gutterBottom>
            {job.company_name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap', my: 1, color: '#475569', fontSize: 13 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <MapPin size={15} color="#64748b" /> {job.location}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Briefcase size={15} color="#64748b" /> {job.experience_required}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <DollarSign size={15} color="#10b981" /> <strong>{job.salary_range}</strong>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ my: 1.5, lineHeight: 1.5 }}>
            {job.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary">
              Required:
            </Typography>
            {reqSkills.map((sk, idx) => {
              const hasSkill = studentLower.includes(sk.toLowerCase());
              return (
                <Chip
                  key={idx}
                  label={sk}
                  size="small"
                  sx={{
                    bgcolor: hasSkill ? '#dcfce7' : '#f1f5f9',
                    color: hasSkill ? '#15803d' : '#475569',
                    fontWeight: 600,
                    fontSize: 11
                  }}
                />
              );
            })}
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', minWidth: 140, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" display="block">
            RAG MATCH
          </Typography>
          <Typography variant="h5" fontWeight={800} color={score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444'}>
            {score}%
          </Typography>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onApply(job)}
            sx={{ mt: 1.5, borderRadius: 2 }}
          >
            Apply Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
