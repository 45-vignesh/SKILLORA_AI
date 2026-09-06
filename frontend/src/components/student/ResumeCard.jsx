import React from 'react';
import { Card, Box, Typography, Button, Chip } from '@mui/material';
import { FileText, CheckCircle, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ResumeCard({ resumeInfo }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ p: 1.5, bgcolor: '#eff6ff', borderRadius: 2, color: '#2563eb' }}>
            <FileText size={28} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} color="#1e3a8a">
              {resumeInfo && resumeInfo.has_resume ? resumeInfo.filename : 'Upload Resume for RAG AI Parsing'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {resumeInfo && resumeInfo.has_resume
                ? `Uploaded on ${new Date(resumeInfo.uploaded_at).toLocaleDateString()} • Parsed into vector knowledge base`
                : 'Upload PDF or TXT to automatically extract skills, projects, and career readiness.'}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<Upload size={16} />}
          onClick={() => navigate('/student/resume-upload')}
          sx={{ borderRadius: 2 }}
        >
          {resumeInfo && resumeInfo.has_resume ? 'Update Resume' : 'Upload Resume'}
        </Button>
      </Box>

      {resumeInfo && resumeInfo.extracted_skills && (
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f1f5f9' }}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1}>
            AI EXTRACTED SKILLS:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {resumeInfo.extracted_skills.map((sk, idx) => (
              <Chip key={idx} label={sk} size="small" sx={{ bgcolor: '#eff6ff', color: '#1e40af', fontWeight: 600 }} />
            ))}
          </Box>
        </Box>
      )}
    </Card>
  );
}
