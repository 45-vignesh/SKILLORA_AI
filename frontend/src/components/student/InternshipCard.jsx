import React from 'react';
import { Card, Box, Typography, Chip, Button } from '@mui/material';
import { MapPin, Calendar, Award, DollarSign } from 'lucide-react';

export default function InternshipCard({ internship, onApply, studentSkills = [] }) {
  if (!internship) return null;

  const reqSkills = internship.required_skills || [];
  const studentLower = studentSkills.map(s => (typeof s === 'string' ? s : s.name || '').toLowerCase());
  const matched = reqSkills.filter(r => studentLower.includes(r.toLowerCase()));
  const score = Math.round((matched.length / Math.max(reqSkills.length, 1)) * 100);

  return (
    <Card sx={{ p: 2.5, mb: 2.5, border: '1px solid #e2e8f0', '&:hover': { borderColor: '#bfdbfe', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label="Internship" size="small" color="secondary" sx={{ fontWeight: 700, fontSize: 10 }} />
            <Typography variant="h6" fontWeight={700} color="#1e3a8a">
              {internship.title}
            </Typography>
          </Box>
          <Typography variant="subtitle2" fontWeight={600} color="#2563eb" sx={{ mt: 0.5 }}>
            {internship.company_name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap', my: 1, color: '#475569', fontSize: 13 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <MapPin size={15} color="#64748b" /> {internship.location}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Calendar size={15} color="#64748b" /> {internship.duration}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <DollarSign size={15} color="#10b981" /> <strong>{internship.stipend}</strong>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ my: 1.5 }}>
            {internship.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary">
              Skills:
            </Typography>
            {reqSkills.map((sk, idx) => (
              <Chip key={idx} label={sk} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 600, fontSize: 11 }} />
            ))}
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', minWidth: 140, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" display="block">
            COMPATIBILITY
          </Typography>
          <Typography variant="h5" fontWeight={800} color={score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444'}>
            {score}%
          </Typography>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onApply(internship)}
            sx={{ mt: 1.5, borderRadius: 2 }}
          >
            Apply Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
