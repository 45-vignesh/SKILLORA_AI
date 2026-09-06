import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, Box, Chip, Button, Divider } from '@mui/material';
import { Progress, Spin, message } from 'antd';
import { TrendingUp, BookOpen, Briefcase, Award, CheckCircle, AlertTriangle, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UnifiedLayout from '../../components/common/UnifiedLayout';
import ProfileCard from '../../components/student/ProfileCard';
import ResumeCard from '../../components/student/ResumeCard';
import CourseCard from '../../components/student/CourseCard';
import JobCard from '../../components/student/JobCard';
import RAGExplanationCard from '../../components/common/RAGExplanationCard';
import { studentService } from '../../services/studentService';
import { aiService } from '../../services/aiService';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [resumeInfo, setResumeInfo] = useState(null);
  const [courses, setCourses] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [ragAnalysis, setRagAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [pRes, rRes, cRes, jRes] = await Promise.all([
        studentService.getProfile(),
        studentService.getMyResume(),
        studentService.getCourses(),
        studentService.getJobs()
      ]);
      setProfile(pRes.data);
      setResumeInfo(rRes.data);
      setCourses(cRes.data.slice(0, 3));
      setJobs(jRes.data.slice(0, 2));

      // Trigger RAG analysis for student target role
      const studentSkills = pRes.data.skills?.map(s => s.name) || ['Python', 'Linux', 'Networking'];
      const ragRes = await aiService.analyzeSkillGap(studentSkills, pRes.data.target_role || 'Cloud Engineer');
      setRagAnalysis(ragRes.data);
    } catch (err) {
      console.error(err);
      message.error('Failed to load student dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <UnifiedLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
          <Spin size="large" tip="Loading AI Student Dashboard..." />
        </Box>
      </UnifiedLayout>
    );
  }

  return (
    <UnifiedLayout>
      {/* Welcome Banner */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800} color="#1e3a8a">
          Welcome back, {profile?.full_name?.split(' ')[0]} 👋
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Here is your AI-powered career roadmap, skill readiness index, and matched industry opportunities.
        </Typography>
      </Box>

      {/* Profile Overview Card */}
      <ProfileCard profile={profile} />

      {/* Quick Metrics Bar */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: '#eff6ff', borderRadius: 2, color: '#2563eb' }}>
              <TrendingUp size={24} />
            </Box>
            <div>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>READINESS SCORE</Typography>
              <Typography variant="h5" fontWeight={800} color="#1e3a8a">{profile?.readiness_score || 78.5}%</Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: '#ecfdf5', borderRadius: 2, color: '#10b981' }}>
              <CheckCircle size={24} />
            </Box>
            <div>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>VERIFIED SKILLS</Typography>
              <Typography variant="h5" fontWeight={800} color="#1e3a8a">{profile?.skills?.length || 9}</Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: '#fef3c7', borderRadius: 2, color: '#d97706' }}>
              <AlertTriangle size={24} />
            </Box>
            <div>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>IDENTIFIED GAPS</Typography>
              <Typography variant="h5" fontWeight={800} color="#1e3a8a">{profile?.missing_skills?.length || 4}</Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: '#f3e8ff', borderRadius: 2, color: '#9333ea' }}>
              <Award size={24} />
            </Box>
            <div>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>PROJECTS & CERTS</Typography>
              <Typography variant="h5" fontWeight={800} color="#1e3a8a">{(profile?.projects?.length || 2) + (profile?.certifications?.length || 1)}</Typography>
            </div>
          </Card>
        </Grid>
      </Grid>

      {/* RAG Explainable Analysis Widget */}
      <RAGExplanationCard aiData={ragAnalysis} targetTitle={profile?.target_role} />

      {/* Resume Card */}
      <ResumeCard resumeInfo={resumeInfo} />

      {/* Recommended Courses Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <div>
            <Typography variant="h6" fontWeight={700} color="#1e3a8a">
              Recommended Learning Pathways
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Curated by RAG engine to close your skill gaps for {profile?.target_role}
            </Typography>
          </div>
          <Button size="small" endIcon={<ArrowRight size={14} />} onClick={() => navigate('/student/courses')}>
            View All Courses
          </Button>
        </Box>

        <Grid container spacing={2.5}>
          {courses.map((c) => (
            <Grid item xs={12} md={4} key={c.id}>
              <CourseCard
                course={c}
                onEnroll={() => navigate('/student/courses')}
                onViewDetails={() => navigate('/student/courses')}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Matching Jobs Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <div>
            <Typography variant="h6" fontWeight={700} color="#1e3a8a">
              Top Job Matches
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Ranked with explainable vector compatibility
            </Typography>
          </div>
          <Button size="small" endIcon={<ArrowRight size={14} />} onClick={() => navigate('/student/jobs')}>
            Browse Jobs
          </Button>
        </Box>

        {jobs.map((j) => (
          <JobCard
            key={j.id}
            job={j}
            studentSkills={profile?.skills || []}
            onApply={() => navigate('/student/jobs')}
          />
        ))}
      </Box>
    </UnifiedLayout>
  );
}
