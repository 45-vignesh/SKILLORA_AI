import API from './api';

export const institutionService = {
  getProfile: () => API.get('/institution/profile'),
  getStudents: () => API.get('/institution/students'),
  getDepartmentStats: () => API.get('/institution/departments'),
  getPartners: () => API.get('/institution/partners'),
  generateCurriculumFeedback: (department) => API.post('/institution/curriculum-feedback', { department }),
  getAnalytics: () => API.get('/analytics/institution'),
  getPlacementAnalytics: () => API.get('/analytics/placement'),
  getSkillDemandTrends: () => API.get('/analytics/skill-demand'),
};
