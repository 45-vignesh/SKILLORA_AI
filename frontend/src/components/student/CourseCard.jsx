import React from 'react';
import { Card, Box, Typography, Chip, Button } from '@mui/material';
import { Star, Clock, Award, BookOpen } from 'lucide-react';

export default function CourseCard({ course, onEnroll, onViewDetails }) {
  if (!course) return null;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2.5, transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Chip label={course.level} size="small" color={course.level === 'Beginner' ? 'success' : course.level === 'Intermediate' ? 'primary' : 'warning'} sx={{ fontWeight: 600, fontSize: 11 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#f59e0b', fontWeight: 700, fontSize: 13 }}>
          <Star size={14} fill="#f59e0b" /> {course.rating}
        </Box>
      </Box>

      <Typography variant="subtitle1" fontWeight={700} color="#1e3a8a" gutterBottom noWrap title={course.title}>
        {course.title}
      </Typography>

      <Typography variant="caption" color="text.secondary" fontWeight={500} display="block" mb={1}>
        {course.provider} • {course.instructor}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {course.description}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
        {course.skills_covered && course.skills_covered.slice(0, 3).map((sk, idx) => (
          <Chip key={idx} label={sk} size="small" sx={{ fontSize: 10, bgcolor: '#f1f5f9' }} />
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1.5, borderTop: '1px solid #f1f5f9' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b', fontSize: 12 }}>
          <Clock size={14} /> {course.duration}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="outlined" onClick={() => onViewDetails(course)}>
            Syllabus
          </Button>
          <Button size="small" variant="contained" onClick={() => onEnroll(course.id)}>
            Enroll
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
