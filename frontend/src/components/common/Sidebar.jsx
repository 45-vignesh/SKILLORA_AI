import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, User, FileText, CheckSquare, TrendingUp, BookOpen,
  Briefcase, Award, FolderGit2, Calendar, Coffee, PlusCircle, Users,
  BarChart2, ShieldCheck, GraduationCap, Network, Search, Video, School
} from 'lucide-react';
import { authService } from '../../services/authService';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = authService.getCurrentUser() || { role: 'STUDENT' };

  const menuItems = {
    STUDENT: [
      { label: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'My Profile', path: '/student/profile', icon: <User size={18} /> },
      { label: 'RAG Resume Parser', path: '/student/resume-upload', icon: <FileText size={18} /> },
      { label: 'Skill Assessment', path: '/student/assessment', icon: <CheckSquare size={18} /> },
      { label: 'Skill Gap Analysis', path: '/student/skill-gap', icon: <TrendingUp size={18} /> },
      { label: 'Courses & Pathways', path: '/student/courses', icon: <BookOpen size={18} /> },
      { label: 'Internships', path: '/student/internships', icon: <Briefcase size={18} /> },
      { label: 'Job Applications', path: '/student/jobs', icon: <Briefcase size={18} /> },
      { label: 'Certifications', path: '/student/certifications', icon: <Award size={18} /> },
      { label: 'Projects Portfolio', path: '/student/projects', icon: <FolderGit2 size={18} /> },
      { label: 'Daily Challenges', path: '/student/challenges', icon: <Calendar size={18} /> },
      { label: 'Productivity & Breaks', path: '/student/breaks', icon: <Coffee size={18} /> }
    ],
    INDUSTRY: [
      { label: 'Dashboard', path: '/industry/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Company Profile', path: '/industry/profile', icon: <User size={18} /> },
      { label: 'Post New Job', path: '/industry/create-job', icon: <PlusCircle size={18} /> },
      { label: 'Manage Jobs', path: '/industry/manage-jobs', icon: <Briefcase size={18} /> },
      { label: 'Post Internship', path: '/industry/create-internship', icon: <PlusCircle size={18} /> },
      { label: 'Manage Internships', path: '/industry/manage-internships', icon: <Briefcase size={18} /> },
      { label: 'Candidate Applications', path: '/industry/applications', icon: <Users size={18} /> },
      { label: 'RAG Talent Search', path: '/industry/student-search', icon: <Search size={18} /> },
      { label: 'Interviews', path: '/industry/interviews', icon: <Video size={18} /> },
      { label: 'Faculty Training (FDP)', path: '/industry/training', icon: <School size={18} /> }
    ],
    INSTITUTION: [
      { label: 'Institution Dashboard', path: '/institution/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Student Roster', path: '/institution/students', icon: <Users size={18} /> },
      { label: 'Placement Analytics', path: '/institution/placement-analysis', icon: <BarChart2 size={18} /> },
      { label: 'Skill Demand Trends', path: '/institution/skill-demand', icon: <TrendingUp size={18} /> },
      { label: 'RAG Curriculum Insights', path: '/institution/curriculum', icon: <BookOpen size={18} /> },
      { label: 'Industry Partners', path: '/institution/partners', icon: <Network size={18} /> }
    ],
    ACADEMICIAN: [
      { label: 'Faculty Dashboard', path: '/academician/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Faculty Opportunities', path: '/academician/opportunities', icon: <GraduationCap size={18} /> },
      { label: 'Industrial Training', path: '/academician/training', icon: <Briefcase size={18} /> },
      { label: 'Research Projects', path: '/academician/research', icon: <FolderGit2 size={18} /> },
      { label: 'Collaborations & Mentorship', path: '/academician/collaboration', icon: <Users size={18} /> }
    ],
    ADMIN: [
      { label: 'System Analytics', path: '/institution/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Student Directory', path: '/institution/students', icon: <Users size={18} /> },
      { label: 'Placement Roster', path: '/institution/placement-analysis', icon: <BarChart2 size={18} /> }
    ]
  };

  const currentItems = menuItems[user.role] || menuItems.STUDENT;

  return (
    <Box sx={{
      width: 260,
      flexShrink: 0,
      bgcolor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      height: 'calc(100vh - 65px)',
      position: 'sticky',
      top: 65,
      overflowY: 'auto',
      p: 2,
      display: { xs: 'none', md: 'block' }
    }}>
      <Typography variant="caption" fontWeight={700} color="#94a3b8" sx={{ px: 1.5, letterSpacing: 0.5, textTransform: 'uppercase' }}>
        {user.role} PORTAL
      </Typography>

      <List dense sx={{ mt: 1 }}>
        {currentItems.map((item, idx) => {
          const active = location.pathname === item.path;
          return (
            <ListItemButton
              key={idx}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                py: 1,
                px: 1.5,
                bgcolor: active ? '#eff6ff' : 'transparent',
                color: active ? '#2563eb' : '#475569',
                fontWeight: active ? 700 : 500,
                '&:hover': { bgcolor: active ? '#eff6ff' : '#f8fafc', color: '#2563eb' }
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: active ? '#2563eb' : '#64748b' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 13, fontWeight: active ? 700 : 500 }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
