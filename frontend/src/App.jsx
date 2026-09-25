import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Public
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

// Student
import StudentDashboard from './pages/student/Dashboard';
import ResumeAnalyzer from './pages/student/ResumeAnalyzer';
import SkillAssessment from './pages/student/SkillAssessment';
import SkillGap from './pages/student/SkillGap';
import CareerRec from './pages/student/CareerRec';
import JobMatching from './pages/student/JobMatching';
import ApplicationTracker from './pages/student/ApplicationTracker';
import LearningPath from './pages/student/LearningPath';
import Portfolio from './pages/student/Portfolio';

// Company
import CompanyDashboard from './pages/company/Dashboard';
import PostJob from './pages/company/PostJob';
import CandidateSearch from './pages/company/CandidateSearch';
import CompanyApplications from './pages/company/Applications';

// Academician
import AcademicianDashboard from './pages/academician/Dashboard';
import FDPTraining from './pages/academician/FDPTraining';
import Research from './pages/academician/Research';
import Collaborations from './pages/academician/Collaborations';

// Institution
import InstitutionDashboard from './pages/institution/Dashboard';
import StudentAnalytics from './pages/institution/StudentAnalytics';
import PlacementTracker from './pages/institution/PlacementTracker';
import IndustryDemand from './pages/institution/IndustryDemand';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      {/* Student */}
      <Route path="/student/dashboard" element={<Layout><StudentDashboard /></Layout>} />
      <Route path="/student/resume" element={<Layout><ResumeAnalyzer /></Layout>} />
      <Route path="/student/assessment" element={<Layout><SkillAssessment /></Layout>} />
      <Route path="/student/skill-gap" element={<Layout><SkillGap /></Layout>} />
      <Route path="/student/career" element={<Layout><CareerRec /></Layout>} />
      <Route path="/student/jobs" element={<Layout><JobMatching /></Layout>} />
      <Route path="/student/applications" element={<Layout><ApplicationTracker /></Layout>} />
      <Route path="/student/learning-path" element={<Layout><LearningPath /></Layout>} />
      <Route path="/student/portfolio" element={<Layout><Portfolio /></Layout>} />

      {/* Company */}
      <Route path="/company/dashboard" element={<Layout><CompanyDashboard /></Layout>} />
      <Route path="/company/post-job" element={<Layout><PostJob /></Layout>} />
      <Route path="/company/candidates" element={<Layout><CandidateSearch /></Layout>} />
      <Route path="/company/applications" element={<Layout><CompanyApplications /></Layout>} />

      {/* Academician */}
      <Route path="/academician/dashboard" element={<Layout><AcademicianDashboard /></Layout>} />
      <Route path="/academician/fdp" element={<Layout><FDPTraining /></Layout>} />
      <Route path="/academician/research" element={<Layout><Research /></Layout>} />
      <Route path="/academician/collaborations" element={<Layout><Collaborations /></Layout>} />

      {/* Institution */}
      <Route path="/institution/dashboard" element={<Layout><InstitutionDashboard /></Layout>} />
      <Route path="/institution/students" element={<Layout><StudentAnalytics /></Layout>} />
      <Route path="/institution/placement" element={<Layout><PlacementTracker /></Layout>} />
      <Route path="/institution/demand" element={<Layout><IndustryDemand /></Layout>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
