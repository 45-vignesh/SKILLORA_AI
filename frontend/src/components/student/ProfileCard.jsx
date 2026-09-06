import React from 'react';
import { Card, Box, Typography, Avatar, Chip, Button, Divider } from '@mui/material';
import { Progress } from 'antd';
import { Github, Linkedin, Globe, MapPin, Award, BookOpen, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard({ profile }) {
  const navigate = useNavigate();
  if (!profile) return null;

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' }, gap: 3 }}>
        <Avatar sx={{ width: 84, height: 84, bgcolor: '#2563eb', fontSize: 32, fontWeight: 800 }}>
          {profile.full_name ? profile.full_name[0] : 'S'}
        </Avatar>

        <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'space-between' }, flexWrap: 'wrap', gap: 1 }}>
            <div>
              <Typography variant="h5" fontWeight={800} color="#1e3a8a">
                {profile.full_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {profile.department} • {profile.institution_name}
              </Typography>
            </div>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Edit size={14} />}
              onClick={() => navigate('/student/profile')}
              sx={{ borderRadius: 2 }}
            >
              Edit Profile
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: 2, mt: 1.5, flexWrap: 'wrap' }}>
            <Chip label={`Target: ${profile.target_role || 'Full Stack Developer'}`} size="small" color="primary" sx={{ fontWeight: 600 }} />
            <Chip label={`CGPA: ${profile.cgpa || 8.5}`} size="small" sx={{ bgcolor: '#ecfdf5', color: '#065f46', fontWeight: 600 }} />
            <Chip label={`Year: ${profile.year_of_study || 3}rd Year`} size="small" variant="outlined" />
          </Box>

          {profile.bio && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.5 }}>
              {profile.bio}
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: 2, mt: 2 }}>
            {profile.github_url && (
              <a href={profile.github_url} target="_blank" rel="noreferrer" style={{ color: '#475569' }}>
                <Github size={18} />
              </a>
            )}
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" style={{ color: '#0284c7' }}>
                <Linkedin size={18} />
              </a>
            )}
            {profile.portfolio_url && (
              <a href={profile.portfolio_url} target="_blank" rel="noreferrer" style={{ color: '#10b981' }}>
                <Globe size={18} />
              </a>
            )}
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', minWidth: 120 }}>
          <Progress
            type="circle"
            percent={Math.round(profile.readiness_score || 70)}
            width={72}
            strokeColor="#2563eb"
          />
          <Typography variant="caption" display="block" fontWeight={700} color="text.secondary" sx={{ mt: 1 }}>
            CAREER READINESS
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
