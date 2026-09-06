import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UnifiedLayout from './components/common/UnifiedLayout';

// Landing and Auth
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Student Module Pages
import StudentLogin from './pages/student/StudentLogin';
import StudentRegister from './pages/student/StudentRegister';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import ResumeUpload from './pages/student/ResumeUpload';
import SkillAssessment from './pages/student/SkillAssessment';
import SkillGap from './pages/student/SkillGap';
import Courses from './pages/student/Courses';
import CourseProgress from './pages/student/CourseProgress';
import Internships from './pages/student/Internships';
import JobApplications from './pages/student/JobApplications';
import Certifications from './pages/student/Certifications';
import Projects from './pages/student/Projects';
import DailyChallenges from './pages/student/DailyChallenges';
import Breaks from './pages/student/Breaks';

// Industry Module Pages
import IndustryLogin from './pages/industry/IndustryLogin';
import IndustryRegister from './pages/industry/IndustryRegister';
import IndustryDashboard from './pages/industry/IndustryDashboard';
import CreateJob from './pages/industry/CreateJob';
import ManageJobs from './pages/industry/ManageJobs';
import CreateInternship from './pages/industry/CreateInternship';
import ManageInternships from './pages/industry/ManageInternships';
import Applications from './pages/industry/Applications';
import StudentSearch from './pages/industry/StudentSearch';
import Assessment from './pages/industry/Assessment';
import Interview from './pages/industry/Interview';
import FacultyTraining from './pages/industry/FacultyTraining';
import IndustryProfile from './pages/industry/IndustryProfile';

// Institution Module Pages
import InstitutionLogin from './pages/institution/InstitutionLogin';
import InstitutionDashboard from './pages/institution/InstitutionDashboard';
import StudentTracking from './pages/institution/StudentTracking';
import PlacementAnalysis from './pages/institution/PlacementAnalysis';
import SkillDemand from './pages/institution/SkillDemand';
import CurriculumModification from './pages/institution/CurriculumModification';
import IndustryConnections from './pages/institution/IndustryConnections';

// Academician Module Pages
import AcademicianLogin from './pages/academician/AcademicianLogin';
import AcademicianDashboard from './pages/academician/AcademicianDashboard';
import FacultyOpportunities from './pages/academician/FacultyOpportunities';
import IndustrialTraining from './pages/academician/IndustrialTraining';
import ResearchProjects from './pages/academician/ResearchProjects';
import Collaboration from './pages/academician/Collaboration';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Student Public Auth */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/register" element={<StudentRegister />} />

      {/* Student Protected / Layout Routes */}
      <Route path="/student/dashboard" element={<UnifiedLayout><StudentDashboard /></UnifiedLayout>} />
      <Route path="/student/profile" element={<UnifiedLayout><StudentProfile /></UnifiedLayout>} />
      <Route path="/student/resume" element={<UnifiedLayout><ResumeUpload /></UnifiedLayout>} />
      <Route path="/student/resume-upload" element={<UnifiedLayout><ResumeUpload /></UnifiedLayout>} />
      <Route path="/student/assessment" element={<UnifiedLayout><SkillAssessment /></UnifiedLayout>} />
      <Route path="/student/skill-gap" element={<UnifiedLayout><SkillGap /></UnifiedLayout>} />
      <Route path="/student/courses" element={<UnifiedLayout><Courses /></UnifiedLayout>} />
      <Route path="/student/course-progress" element={<UnifiedLayout><CourseProgress /></UnifiedLayout>} />
      <Route path="/student/internships" element={<UnifiedLayout><Internships /></UnifiedLayout>} />
      <Route path="/student/jobs" element={<UnifiedLayout><JobApplications /></UnifiedLayout>} />
      <Route path="/student/certifications" element={<UnifiedLayout><Certifications /></UnifiedLayout>} />
      <Route path="/student/projects" element={<UnifiedLayout><Projects /></UnifiedLayout>} />
      <Route path="/student/challenges" element={<UnifiedLayout><DailyChallenges /></UnifiedLayout>} />
      <Route path="/student/breaks" element={<UnifiedLayout><Breaks /></UnifiedLayout>} />

      {/* Industry Public Auth */}
      <Route path="/industry/login" element={<IndustryLogin />} />
      <Route path="/industry/register" element={<IndustryRegister />} />

      {/* Industry Protected / Layout Routes */}
      <Route path="/industry/dashboard" element={<UnifiedLayout><IndustryDashboard /></UnifiedLayout>} />
      <Route path="/industry/profile" element={<UnifiedLayout><IndustryProfile /></UnifiedLayout>} />
      <Route path="/industry/create-job" element={<UnifiedLayout><CreateJob /></UnifiedLayout>} />
      <Route path="/industry/jobs" element={<UnifiedLayout><ManageJobs /></UnifiedLayout>} />
      <Route path="/industry/manage-jobs" element={<UnifiedLayout><ManageJobs /></UnifiedLayout>} />
      <Route path="/industry/create-internship" element={<UnifiedLayout><CreateInternship /></UnifiedLayout>} />
      <Route path="/industry/internships" element={<UnifiedLayout><ManageInternships /></UnifiedLayout>} />
      <Route path="/industry/manage-internships" element={<UnifiedLayout><ManageInternships /></UnifiedLayout>} />
      <Route path="/industry/applications" element={<UnifiedLayout><Applications /></UnifiedLayout>} />
      <Route path="/industry/student-search" element={<UnifiedLayout><StudentSearch /></UnifiedLayout>} />
      <Route path="/industry/students" element={<UnifiedLayout><StudentSearch /></UnifiedLayout>} />
      <Route path="/industry/assessment" element={<UnifiedLayout><Assessment /></UnifiedLayout>} />
      <Route path="/industry/interviews" element={<UnifiedLayout><Interview /></UnifiedLayout>} />
      <Route path="/industry/interview" element={<UnifiedLayout><Interview /></UnifiedLayout>} />
      <Route path="/industry/training" element={<UnifiedLayout><FacultyTraining /></UnifiedLayout>} />
      <Route path="/industry/faculty-training" element={<UnifiedLayout><FacultyTraining /></UnifiedLayout>} />

      {/* Institution Public Auth */}
      <Route path="/institution/login" element={<InstitutionLogin />} />

      {/* Institution Protected / Layout Routes */}
      <Route path="/institution/dashboard" element={<UnifiedLayout><InstitutionDashboard /></UnifiedLayout>} />
      <Route path="/institution/students" element={<UnifiedLayout><StudentTracking /></UnifiedLayout>} />
      <Route path="/institution/placements" element={<UnifiedLayout><PlacementAnalysis /></UnifiedLayout>} />
      <Route path="/institution/placement-analysis" element={<UnifiedLayout><PlacementAnalysis /></UnifiedLayout>} />
      <Route path="/institution/skill-demand" element={<UnifiedLayout><SkillDemand /></UnifiedLayout>} />
      <Route path="/institution/curriculum" element={<UnifiedLayout><CurriculumModification /></UnifiedLayout>} />
      <Route path="/institution/partners" element={<UnifiedLayout><IndustryConnections /></UnifiedLayout>} />
      <Route path="/institution/connections" element={<UnifiedLayout><IndustryConnections /></UnifiedLayout>} />

      {/* Academician Public Auth */}
      <Route path="/academician/login" element={<AcademicianLogin />} />

      {/* Academician Protected / Layout Routes */}
      <Route path="/academician/dashboard" element={<UnifiedLayout><AcademicianDashboard /></UnifiedLayout>} />
      <Route path="/academician/opportunities" element={<UnifiedLayout><FacultyOpportunities /></UnifiedLayout>} />
      <Route path="/academician/training" element={<UnifiedLayout><IndustrialTraining /></UnifiedLayout>} />
      <Route path="/academician/research" element={<UnifiedLayout><ResearchProjects /></UnifiedLayout>} />
      <Route path="/academician/collaboration" element={<UnifiedLayout><Collaboration /></UnifiedLayout>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
